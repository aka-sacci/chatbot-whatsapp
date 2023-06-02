import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";
import { inactivityTimerSync } from "../../../providers/session";

export const stageSeven: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        if (params.message.type === 'chat') {
            let cep = params.message.body.replace(/[^\d]/g, '')
            if (cep.length == 8) {
                stageStorage[params.from].contactData.address = {
                    street: String(stageStorage[params.from].contactData.address?.street),
                    number: Number(stageStorage[params.from].contactData.address?.number),
                    district: String(stageStorage[params.from].contactData.address?.district),
                    cep: Number(cep)
                }
                stageStorage[params.from].stage = 8
                return ["Só mais uma! Agora, diigite o *complemento*:",
                    'Se não houver complemento, digite apenas 0:']
            } else {
                return ["❌ CEP inválido! Por favor, escreva o CEP da sua casa!"]
            }
        } else {
            return ["❌ Formato inválido! Por favor, escreva o CEP da sua casa!"]
        }
    }
}