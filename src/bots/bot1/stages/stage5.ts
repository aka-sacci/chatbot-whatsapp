import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";

export const stageFive: iStage = {
    exec(params: iStageParams) {
        const returnedMessage = params.message;

        switch (returnedMessage) {
            case '1':
                stageStorage[params.from].stage = 5;
                return ['Tudo certo!'];
            case '2':
                stageStorage[params.from].stage = 2;
                return ['Ok, então digite seu nome novamente:']
            default:
                return ["Opção Inválida"]
        }

    }
}