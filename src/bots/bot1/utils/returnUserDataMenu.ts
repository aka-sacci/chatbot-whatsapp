import { stageStorage } from "../../../stageStorage"

export default function returnUserDataMenu(from: string, stage: number): Array<string> {
    let complement = stageStorage[from].contactData?.address?.complement === null ? ".\n" :
        ` (${stageStorage[from].contactData?.address?.complement}). \n`
    let firstMessage = ""
    switch (stage) {
        case 1:
            firstMessage = "Certo. Identificamos que este número já fez contato conosco anteriormente. Por favor, confira seus dados:"
            break
        case 3:
        case 4:
            firstMessage = "Certo. Seguem os seus dados atualizados:"
            break
        default:
            firstMessage = "Certo: Seguem os seus dados"
            break
    }
    return [firstMessage,
        'Nome: ' + stageStorage[from].contactData?.name + "\n" +
        'Endereço: ' + stageStorage[from].contactData?.address?.street + ", n° " +
        stageStorage[from].contactData?.address?.number + ' - ' +
        stageStorage[from].contactData?.address?.district + '' +
        complement +
        'CEP: ' + stageStorage[from].contactData?.address?.cep,
        "*1 - Continuar para atendimento* \n" +
        "*2 - Corrigir Nome* \n" +
        "*3 - Corrigir Endereço* \n"]
}