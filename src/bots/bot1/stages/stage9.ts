import { iStageParams, iCreateTalkStage } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import messageLoop from "../../../utils/messageLoop";
import setDelay from "../../../utils/setDelay";
import { createNewChat, getAttendantSessionID } from "../providers/chat";
import returnProtocolNumber from "../utils/returnProtocolNumber";

export const stageNine: iCreateTalkStage = {
    async exec(params: iStageParams) {

        let userTimer = stageStorage[params.from].userDisponibilityTimer
        if (!userTimer) {
            let attendantSession = await getAttendantSessionID()
            if (attendantSession) {
                await this.execCreateChat(attendantSession, params)
            } else {
                stageStorage[params.from].userDisponibilityTimer = true
                params.client.sendText(params.from, "No momento, todos os nossos atendentes estão indisponíveis. " +
                    "Assim que alguém estiver disponível, iremos te avisar por aqui.").then(async () => {
                    }).catch(error => console.error('Error when sending message', error));

                while (stageStorage[params.from].userDisponibilityTimer) {
                    await setDelay(5000)
                    attendantSession = await getAttendantSessionID()
                    if (attendantSession) {
                        stageStorage[params.from].userDisponibilityTimer = false
                        await this.execCreateChat(attendantSession, params)
                    }
                }
            }
        }
    },

    async execCreateChat(attendantSession: number, params: iStageParams) {
        let chatID = await createNewChat(attendantSession, params.from)
        if (chatID) {
            stageStorage[params.from].stage = 10
            let protocolNumber = returnProtocolNumber(chatID)
            stageStorage[params.from].chatID = chatID
            params.client.sendText(params.from, "Atendimento iniciado. O seu número de protocolo é: " + protocolNumber).then(async () => {
            }).catch(error => console.error('Error when sending message', error));

            //cria o loop de sincronização
            await this.execCreateSyncLoop(params)

        } else {
            stageStorage[params.from].stage = 0
            params.client.sendText(params.from, "Parece que houve um erro aqui na nossa ponta. Por favor, tente novamente mais tarde.").then(async () => {
            }).catch(error => console.error('Error when sending message', error));
        }
    },
    async execCreateSyncLoop(params: iStageParams) {
        stageStorage[params.from].syncMessageLoop = true
        //while (stageStorage[params.from].syncMessageLoop) {
            //await messageLoop()
        //}
    },

}
