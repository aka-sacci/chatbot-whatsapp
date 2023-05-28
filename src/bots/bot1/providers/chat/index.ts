import { iCreateNewChatProps, iSendMessageProps } from "../../../../@types/myTypes";
import checkUserDisponibility from "../../services/chat/checkUserDisponibility";
import createChat from "../../services/chat/createChat";
import downloadProfilePic from "../../services/chat/downloadProfilePic";
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
    let { chat, type, content } = props
    form.append('chat', String(chat))
    form.append('sender', '2')
    form.append('type', type)
    form.append('content', content)
    if (props.filename != undefined) {
        form.append('file', props.filename, uniqueSuffix + '.' + props.fileExtension)
    }
    await sendMessage(form)
}

async function saveProfilePic(url: string): Promise<Buffer | undefined> {
    let result = await downloadProfilePic(url)
    return result
    
}

export { getAttendantSessionID, createNewChat, sendNewMessage, saveProfilePic }