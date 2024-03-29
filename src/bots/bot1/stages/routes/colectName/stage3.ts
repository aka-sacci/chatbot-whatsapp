import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";
import { updateContactData } from "../../../providers/contactProvider";
import { inactivityTimerSync } from "../../../providers/session";
import returnUserDataMenu from "../../../utils/returnUserDataMenu";

export const stageThree: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        let returnedMessage = ""
        returnedMessage = params.message.body;

        if (params.message.type === 'chat') {
            stageStorage[params.from].contactData = {
                phone: params.from,
                name: returnedMessage,
                registered: true,
                address: {
                    street: String(stageStorage[params.from].contactData.address?.street),
                    number: Number(stageStorage[params.from].contactData.address?.number),
                    district: String(stageStorage[params.from].contactData.address?.district),
                    cep: Number(stageStorage[params.from].contactData.address?.cep),
                    
                }
            }

            switch (stageStorage[params.from].comeFromStage) {
                case 2:
                    stageStorage[params.from].stage = 2
                    let returnMessage = returnUserDataMenu(params.from, 3)
                    await updateContactData({ ...stageStorage[params.from].contactData })
                    return [...returnMessage]
                case 1:
                    stageStorage[params.from].stage = 4
                    return ['Certo, agora vamos ao endereço.',
                        'Iremos pedir os dados de endereço separadamente, então, por favor, siga às instruções especificadas a seguir.',
                        'Por favor, digite o nome da *RUA*, *AVENIDA* ou *TRAVESSA* que você mora:']
                default:
                    stageStorage[params.from].stage = 0
                    return ['Houve um problema interno! Por favor, tente novamente!']
            }
        } else {
            return ["❌ Formato inválido! Por favor, *digite* o seu nome!"]
        }

    }
}