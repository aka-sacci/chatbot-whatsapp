import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import { inactivityTimerSync } from "../providers/session";

export const stageTwo: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        const returnedMessage = params.message.body;

        switch (returnedMessage) {
            case '1':
                stageStorage[params.from].stage = 9;
                return ['Tudo certo 😄! Só um momento enquato ligamos você a um dos nossos colaboradores.']
            case '2':
                stageStorage[params.from].stage = 3;
                stageStorage[params.from].comeFromStage = 2
                return ['Sem problemas! Iremos coletar seu nome novamente.',
                "Por favor, digite novamente o seu nome:"]
            case '3':
                stageStorage[params.from].stage = 4;
                stageStorage[params.from].comeFromStage = 2
                return ['Sem problemas! Iremos coletar o seu endereço novamente.',
                "Por favor, digite o nome da rua, avenida ou travessa que você mora:"]
            default:
                return ["❌Opção Inválida!"]
        }

    }
}