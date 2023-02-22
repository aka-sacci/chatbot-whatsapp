import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";

export const stageTwo: iStage = {
    exec(params: iStageParams){
        const returnedMessage = params.message;

        switch (returnedMessage) {
            case '1':
            case '2':
            case '3':
                stageStorage[params.from].stage = 2;
                stageStorage[params.from].option = returnedMessage;
                return ['Por gentileza, digite seu nome:']
            default:
                return ["❌Opção Inválida! Por favor, escolha novamente!"]
        }

    }
}