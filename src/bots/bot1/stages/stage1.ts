import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import { isContactRegistered } from "../providers/contactProvider";
import checkContactRegister from "../services/contact/checkContactRegister";

export const stageOne: iStage = {
    async exec(params: iStageParams) {
        let contactRegister = await isContactRegistered(params.from)
        stageStorage[params.from].stage = 1;
        stageStorage[params.from].registered = contactRegister
        return ["👋 Olá! Bem vindo(a) ao atendimento digital da Farmácia XXXXX!💊⚕️🥼",
            "Como podemos te ajudar? \n" +
            "Por favor, digite um número da opção que deseja: \n " +
            "*1 - Orçamento para receitas manipuladas 🧪* \n" +
            "*2 - Orçamento para receitas comuns 💊* \n" +
            "*3 - Quero comprar um produto/medicamento 💵* \n" +
            "*4 - Falar com um atendente 👩‍⚕️* \n"
        ];
    }
}