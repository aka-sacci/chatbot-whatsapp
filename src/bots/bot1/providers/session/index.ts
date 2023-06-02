import { iStageParams } from "../../../../@types/myTypes";
import { stageStorage } from "../../../../stageStorage";
import clearSessionTimeout from "../../utils/clearSessionTimeout";
import setExpireSession from "../../utils/setExpireSession";

function inactivityTimerSync(params: iStageParams) {
    let inactivityTimer = stageStorage[params.from].inactivityTimer
    if (inactivityTimer === null) {
        setExpireSession(params.client, params.from)

    } else {
        clearSessionTimeout(inactivityTimer)
        setExpireSession(params.client, params.from)
    }
}

export { inactivityTimerSync }