import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import { inactivityTimerSync } from "../providers/session";
import returnUserDataMenu from "../utils/returnUserDataMenu";

export const stageOne: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        const returnedMessage = params.message.body;

        switch (returnedMessage) {
            case '1':
            case '2':
            case '3':
                stageStorage[params.from].option = returnedMessage;
                if (stageStorage[params.from].registered === true) {
                    stageStorage[params.from].stage = 2;
                    let retunedData = returnUserDataMenu(params.from, 1)
                    return [...retunedData]

                } else {
                    stageStorage[params.from].stage = 3;
                    stageStorage[params.from].comeFromStage = 1
                    return ['Certo. Para continuarmos o atendimento, precisamos de algumas informações 😀',
                        'Por gentileza, digite seu *nome*:']
                }
            default:
                return ["❌ Opção Inválida! Escolha novamente!"]
        }

    }
}