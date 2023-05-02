import { iStage, iStageParams } from "../../../../../@types/myTypes";
import { stageStorage } from "../../../../../stageStorage";

export const stageEight: iStage = {
    async exec(params: iStageParams) {
        const returnedMessage = params.message;
        stageStorage[params.from].stage = 9;
        if(returnedMessage.isMedia === false){
            //Grava a mensagem no banco de dados
        } else {
            console.log(returnedMessage)
        }

        
        //set stage to talk with a contributor
        return ["😃 Perfeito! Estamos te redirecionando para um de nossos especialistas!"]
    }
}