import { Whatsapp } from "venom-bot";
import { stageStorage } from "../../../stageStorage";
import { stageDefaultValues } from "../../../utils/returnStageDefaultValues";
import { expireChatByInactivity } from "../providers/chat";

export default async function setExpireSession(client: Whatsapp, from: string) {
    const timeout = setTimeout(async () => {
        let chatID = stageStorage[from].chatID
        if (chatID != undefined || chatID != 0) {
            await expireChatByInactivity(chatID)
        }
        client.sendText(from, "Devido ao tempo de inatividade, você foi desconectado!")
        stageStorage[from] = {
            ...stageDefaultValues
        };

    }, 1800000)
    stageStorage[from].inactivityTimer = timeout
}

