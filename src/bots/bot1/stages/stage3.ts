import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";

export const stageThree: iStage = {
    exec(params: iStageParams){
        const returnedMessage = params.message;

        switch (typeof returnedMessage) {
            case 'string':
                stageStorage[params.from].stage = 3;
                stageStorage[params.from].name = returnedMessage;
                return ['Agora, Por gentileza, digite seu email:']
            default:
                return ["Por favor, digite o seu nome!"]
        }

    }
}