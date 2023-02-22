import { iStage, iStageParams } from "../../../@types/myTypes";
import { routes } from "../../../routes";
import { stageStorage } from "../../../stageStorage";

export const stageFive: iStage = {
    exec(params: iStageParams) {
        const returnedMessage = params.message;

        switch (returnedMessage) {
            case '1':
                const route = Number(stageStorage[params.from].option) - 1
                const routeInit = routes[route].option
                stageStorage[params.from].stage = routes[route].stage;
                console.log(`Moved to route ${routes[route].descricao} - number ${routes[route].stage}  `)
                return [...routeInit];
            case '2':
                stageStorage[params.from].stage = 2;
                return ['Sem problemas! Por favor, Digite seu nome novamente:']
            default:
                return ["❌Opção Inválida!"]
        }

    }
}