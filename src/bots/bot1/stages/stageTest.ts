import { iStage, iStageParams } from "../../../@types/myTypes";
import { inactivityTimerSync } from "../providers/session";


export const stageTest: iStage = {
    async exec(params: iStageParams) {
        inactivityTimerSync(params)
        return ["👋 Este é um stage teste."];
    }
}