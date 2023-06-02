import { Whatsapp } from "venom-bot";
import { stageStorage } from "../../../stageStorage";
import { stageDefaultValues } from "../../../utils/returnStageDefaultValues";

export default async function setExpireSession(client: Whatsapp, from: string) {
    const timeout = setTimeout(() => {
        client.sendText(from, "Devido ao tempo de inatividade, você foi desconectado!")
        stageStorage[from] = {
            ...stageDefaultValues
          };
        //await expire talk in database (if chatID exists)
    }, 1800000)
    stageStorage[from].inactivityTimer = timeout
}

