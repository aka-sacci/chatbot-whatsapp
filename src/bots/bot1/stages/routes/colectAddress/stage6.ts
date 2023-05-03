import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";

export const stageSix: iStage = {
    async exec(params: iStageParams) {
        if (typeof params.message === 'string') {
            stageStorage[params.from].contactData.address = {
                street: String(stageStorage[params.from].contactData.address?.street),
                number: Number(stageStorage[params.from].contactData.address?.number),
                district: String(params.message),
                cep: 0
            }
            stageStorage[params.from].stage = 7
            return ["Quase lá! Agora digite *APENAS* o CEP:"]
        } else {
            return ["❌ Opção inválida! Por favor, escreva o *bairro* da sua casa!"]
        }
    }
}