import { iStage, iStageParams, iTalkStage } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import { createNewChat, getAttendantSessionID } from "../providers/chat";
import returnProtocolNumber from "../utils/returnProtocolNumber";

export const stageNine: iTalkStage = {
    async exec(params: iStageParams) {
        //checa se tem nego disponível.
        //se tiver -> cria e retorna UM NÚMERO DE PROTOCOLO (id do chat)
        //SE NÃO TIVER -> retorna uma mensagem falando que não tem ninguém disponível, e SETA UM TIMER DE 30 SEGUNDOS
        //se o cara mandar mensagem enquanto esse timer tiver valendo, não responder.
        //depois desses 30 segundos, realizar a consulta novamente.  caso aiunda não tenha ninguém disponível, não retornar com nenhguma mensagem e resetar o timer.

        let userTimer = stageStorage[params.from].userDisponibilityTimer
        if (userTimer == "" || userTimer == undefined || userTimer == null) {
            let attendantSession = await getAttendantSessionID()
            if (attendantSession != 0 || attendantSession != undefined) {
                let chatID = await createNewChat(attendantSession, params.from)
                if (chatID) {
                    stageStorage[params.from].stage = 10
                    let protocolNumber = returnProtocolNumber(chatID)
                    params.client.sendText(params.from, "Atendimento iniciado. O seu número de protocolo é: " + protocolNumber).then(async () => {
                    }).catch(error => console.error('Error when sending message', error));
                } else {
                    params.client.sendText(params.from, "Parece que houve um erro aqui na nossa ponta. Por favor, tente novamente mais tarde.").then(async () => {
                    }).catch(error => console.error('Error when sending message', error));
                }
            } else {
                //cria o timer
                params.client.sendText(params.from, "No momento, todos os nossos atendentes estão indisponíveis." +
                    "Assim que alguém estiver disponível, iremos te avisar por aqui.").then(async () => {
                    }).catch(error => console.error('Error when sending message', error));
                
                
            }
        }
    }
}