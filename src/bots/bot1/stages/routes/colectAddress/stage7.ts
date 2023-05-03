import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";

export const stageSeven: iStage = {
    async exec(params: iStageParams) {
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
                return ["Por último, digite o *complemento*:",
                    'Se não houver, digite apenas 0:']
            } else {
                return ["❌ CEP inválido! Por favor, escreva o *CEP* da sua casa!"]
            }
        } else {
            return ["❌ Formato inválido! Por favor, escreva o *CEP* da sua casa!"]
        }
    }
}