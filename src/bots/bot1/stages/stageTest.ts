import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import { inactivityTimerSync } from "../providers/session";


export const stageTest: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        stageStorage[params.from].stage = 9
        return ["👋 Este é um stage teste."];
    }
}