import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";

export const stageOne: iStage = {
    exec(params: iStageParams) {
        stageStorage[params.from].stage = 1;
        return ["Estágio 1 > Escolha de opções"];
    }
}