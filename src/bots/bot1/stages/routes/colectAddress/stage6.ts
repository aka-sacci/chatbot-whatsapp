import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";
import { inactivityTimerSync } from "../../../providers/session";

export const stageSix: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        if (params.message.type === 'chat') {
            stageStorage[params.from].contactData.address = {
                street: String(stageStorage[params.from].contactData.address?.street),
                number: Number(stageStorage[params.from].contactData.address?.number),
                district: String(params.message.body),
                cep: 0
            }
            stageStorage[params.from].stage = 7
            return ["Quase lá! Agora, digite o CEP:"]
        } else {
            return ["❌ Opção inválida! Por favor, digite o *bairro* da sua casa!"]
        }
    }
}