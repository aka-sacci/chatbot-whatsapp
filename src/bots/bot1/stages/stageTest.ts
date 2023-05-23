import { iStage, iStageParams } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import returnGreeting from "../utils/returnGreeting";

export const stageTest: iStage = {
    async exec(params: iStageParams) {
        let greeting = returnGreeting()
        console.log(params.from)
        stageStorage[params.from].stage = 9;
        return ["👋 Este é um stage teste."];
    }
}