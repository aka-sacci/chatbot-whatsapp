import { iStage, iStageParams } from "../../../@types/myTypes";

export const stageTest: iStage = {
    async exec(params: iStageParams) {
        console.log(typeof params.message.body)
        console.log(params.message.type)
        return ["👋 Este é um stage teste."
        ];
    }
}