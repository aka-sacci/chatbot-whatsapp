import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";

export const stageThree: iStage = {
    exec(params: iStageParams){
        const returnedMessage = params.message;

        switch (typeof returnedMessage) {
            case 'string':
                stageStorage[params.from].stage = 3;
                stageStorage[params.from].name = returnedMessage;
                return ['Certo! Agora, por gentileza, digite seu email:']
            default:
                return ["❌Opção inválida! Por favor, escreva seu nome!"]
        }

    }
}