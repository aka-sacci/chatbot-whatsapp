import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import { getContactData, isContactRegistered } from "../providers/contactProvider";
import returnGreeting from "../utils/returnGreeting";


export const stageZero: iStage = {
    async exec(params: iStageParams) {
        let contactRegister = await isContactRegistered(params.from)
        if (contactRegister === true) {
            let contactData = await getContactData(params.from)
            stageStorage[params.from].contactData = { ...contactData }
        }
        let greeting = returnGreeting()
        stageStorage[params.from].stage = 1;
        stageStorage[params.from].registered = contactRegister
        return ["👋 Olá, " + greeting + "! Seja muito bem vindo(a) ao atendimento digital da FarmaNova!💊⚕️🥼",
            "Como podemos te ajudar? \n" +
            "Por favor, digite um número da opção que deseja: \n" +
            "*1 - Orçamento para Medicamentos 💊* \n" +
            "*2 - Orçamento para Perfumaria 💄* \n" +
            "*3 - Falar com Atendente 🙍* \n" +
            "*4 - Falar com Farmacêutico 👩‍⚕️*"
        ];
    }
}