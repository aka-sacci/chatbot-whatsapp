import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";

export const stageFour: iStage = {
    exec(params: iStageParams) {
        const returnedMessage = params.message;

        switch (typeof returnedMessage) {
            case 'string':
                stageStorage[params.from].stage = 4;
                stageStorage[params.from].email = returnedMessage;
                return [
                'Cheque suas informações:',
                `Nome: ${stageStorage[params.from].name}`,
                `Email: ${stageStorage[params.from].email}`,
                `As informações estão corretas? \n *1 - Sim* \n *2 - Não*`
                ]
            default:
                return ["Por favor, digite o seu email!"]
        }

    }
}