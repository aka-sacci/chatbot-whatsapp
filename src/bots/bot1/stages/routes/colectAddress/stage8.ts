import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";
import { updateContactData, createContact } from "../../../providers/contactProvider";
import returnUserDataMenu from "../../../utils/returnUserDataMenu";

export const stageEight: iStage = {
    async exec(params: iStageParams) {
        if (params.message.type === 'chat') {
            let complement = params.message.body === "0" ? undefined : params.message.body
            stageStorage[params.from].contactData.address = {
                street: String(stageStorage[params.from].contactData.address?.street),
                number: Number(stageStorage[params.from].contactData.address?.number),
                district: String(stageStorage[params.from].contactData.address?.district),
                cep: Number(stageStorage[params.from].contactData.address?.cep),
                complement
            }
            let retunedData = []
            switch (stageStorage[params.from].comeFromStage) {
                case 1:
                    await createContact({ ...stageStorage[params.from].contactData })
                    stageStorage[params.from].stage = 2;
                    retunedData = returnUserDataMenu(params.from, 8)
                    return [...retunedData]
                case 2:
                    await updateContactData({ ...stageStorage[params.from].contactData })
                    stageStorage[params.from].stage = 2;
                    retunedData = returnUserDataMenu(params.from, 4)
                    return [...retunedData]
                default:
                    stageStorage[params.from].stage = 0;
                    return ["Houve um erro! Tente novamente mais tarde."]
            }

        } else {
            return ["❌ Formato inválido! Por favor, escreva o *complemento* da sua casa! Caso não tenha, apenas digite 0"]
        }
    }
}