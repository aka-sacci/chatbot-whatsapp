import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";

export const stageFour: iStage = {
    async exec(params: iStageParams) {
        if (typeof params.message === 'string') {
            stageStorage[params.from].contactData.address = {
                street: params.message,
                number: 0,
                district: '',
                cep: 0
            }
            stageStorage[params.from].stage = 5
            return ["Certo, agora digite *APENAS* o número:"]
        } else {
            return ["❌ Formato inválido! Por favor, escreva o *nome da rua* da sua casa!"]
        }
    }
}