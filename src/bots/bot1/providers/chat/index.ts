import checkUserDisponibility from "../../services/chat/checkUserDisponibility";
import createChat from "../../services/chat/createChat";

async function getAttendantSessionID(): Promise<number> {
    let result = await checkUserDisponibility();
    return result
}

async function createNewChat(sessionID: number, contact: string): Promise<number> {
    let result = await createChat(sessionID, contact)
    return result
}

export { getAttendantSessionID, createNewChat }