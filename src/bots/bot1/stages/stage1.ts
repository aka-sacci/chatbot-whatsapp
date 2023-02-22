import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";

export const stageOne: iStage = {
    exec(params: iStageParams) {
        stageStorage[params.from].stage = 1;
        return ["👋 Olá! Bem vindo(a) ao atendimento digital da Farmácia XXXXX!💊⚕️🥼",
            "Como podemos te ajudar? \n" +
            "Por favor, digite um número da opção que deseja: \n " +
            "*1 - Orçamento para receitas manipuladas 🧪* \n" +
            "*2 - Orçamento para receitas comuns 💊* \n" +
            "*3 - Quero comprar um produto/medicamento 💵* \n" +
            "*4 - Falar com um atendente 👩‍⚕️*"
        ];
    }
}