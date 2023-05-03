import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";

export const stageFive: iStage = {
    async exec(params: iStageParams) {
        if (typeof params.message === 'string') {
            stageStorage[params.from].contactData.address = {
                street: String(stageStorage[params.from].contactData.address?.street),
                number: Number(params.message),
                district: '',
                cep: 0
            }
            stageStorage[params.from].stage = 6
            return ["Ótimo, agora digite *APENAS* o bairro"]
        } else {
            return ["❌ Formato inválido! Por favor, escreva o *número* da sua casa!"]
        }
    }
}