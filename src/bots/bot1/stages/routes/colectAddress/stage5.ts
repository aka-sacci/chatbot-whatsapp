import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";
import { inactivityTimerSync } from "../../../providers/session";

export const stageFive: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        if (params.message.type === 'chat' && /^[0-9]+$/.test(params.message.body)) {
            stageStorage[params.from].contactData.address = {
                street: String(stageStorage[params.from].contactData.address?.street),
                number: Number(params.message.body),
                district: '',
                cep: 0
            }
            stageStorage[params.from].stage = 6
            return ["Ótimo, agora digite o bairro"]
        } else {
            return ["❌ Formato inválido! Por favor, digite o número da sua casa!"]
        }
    }
}