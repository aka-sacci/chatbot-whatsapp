import { iStage, iStageParams } from "../../../@types/myTypes";
import { routes } from "../../../routes";
import { stageStorage } from "../../../stageStorage";

export const stageTwo: iStage = {
    async exec(params: iStageParams) {
        const returnedMessage = params.message;

        switch (returnedMessage) {
            case '1':
                stageStorage[params.from].stage = 0;
                return ['Agorá é só o redirecionamento :D']
            case '2':
                stageStorage[params.from].stage = 3;
                stageStorage[params.from].comeFromStage = 2
                return ['Sem problemas! Iremos coletar seu nome novamente.',
                "Por favor, digite novamente o seu nome:"]
            case '3':
                stageStorage[params.from].stage = 4;
                stageStorage[params.from].comeFromStage = 2
                return ['Sem problemas! Iremos coletar o seu endereço novamente.',
                "Por favor, digite *APENAS* o nome da *RUA*, *AVENIDA* ou *TRAVESSA* que você mora:"]
            default:
                return ["❌Opção Inválida!"]
        }

    }
}