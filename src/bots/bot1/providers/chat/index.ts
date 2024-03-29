import { iCreateNewChatProps, iSendMessageProps } from "../../../../@types/myTypes";
import setDelay from "../../../../utils/setDelay";
import checkUserDisponibility from "../../services/chat/checkUserDisponibility";
import createChat from "../../services/chat/createChat";
import downloadProfilePic from "../../services/chat/downloadProfilePic";
import expireChat from "../../services/chat/expireChat";
import sendMessage from "../../services/chat/sendMessage";
import FormData from 'form-data';

async function getAttendantSessionID(): Promise<number> {
    let result = await checkUserDisponibility();
    return result
}

async function createNewChat(props: iCreateNewChatProps): Promise<number> {
    const form = new FormData()
    form.append('sessionID', props.sessionID)
    form.append('contact', props.contact)
    if (props.userPicBuffer != undefined) {
        form.append('userPhoto', props.userPicBuffer, props.contact + '.jpg')
    }
    let result = await createChat(form)
    return result
}

async function sendNewMessage(props: iSendMessageProps) {
    const form = new FormData()
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let { chat, type, content, talkID } = props
    form.append('chat', String(chat))
    form.append('sender', "2")
    form.append('type', type)
    form.append('content', content)
    form.append('talkID', talkID)
    if (props.fileBuffer != undefined) {
        form.append('file', props.fileBuffer, uniqueSuffix + '.' + props.fileExtension)
    }
    if (props.replyTo != undefined) {
        form.append('replyTo', props.replyTo)
    }
    await sendMessage(form)
}

async function saveProfilePic(url: string): Promise<Buffer | undefined> {
    let result = await downloadProfilePic(url)
    return result

}

async function sendErrorMessage(props: iSendMessageProps) {
    const form = new FormData()
    let { chat, type, content, talkID } = props
    form.append('chat', String(chat))
    form.append('sender', "1")
    form.append('type', type)
    form.append('content', content)
    form.append('talkID', talkID)
    await sendMessage(form)
}

async function expireChatByInactivity(chatID: number): Promise<boolean> {
    let result = await expireChat(chatID, "inactivity")
    return result
}

export { getAttendantSessionID, createNewChat, sendNewMessage, saveProfilePic, sendErrorMessage, expireChatByInactivity }