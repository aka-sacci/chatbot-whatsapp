import { iStage, iStageParams } from "../../../@types/myTypes";
import returnGreeting from "../utils/returnGreeting";

export const stageTest: iStage = {
    async exec(params: iStageParams) {
        let greeting = returnGreeting()
        console.log(greeting)
        return ["👋 Este é um stage teste."];
    }
}