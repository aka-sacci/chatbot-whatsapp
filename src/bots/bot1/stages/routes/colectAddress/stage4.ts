import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";
import { inactivityTimerSync } from "../../../providers/session";

export const stageFour: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        if (params.message.type === 'chat') {
            stageStorage[params.from].contactData.address = {
                street: params.message.body,
                number: 0,
                district: '',
                cep: 0
            }
            stageStorage[params.from].stage = 5
            return ["Certo, agora o número:"]
        } else {
            return ["❌ Formato inválido! Por favor, digite o nome da rua da sua casa!"]
        }
    }
}