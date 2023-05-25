import { iSendMessageProps } from "../../../../@types/myTypes";
import checkUserDisponibility from "../../services/chat/checkUserDisponibility";
import createChat from "../../services/chat/createChat";
import sendMessage from "../../services/chat/sendMessage";
import FormData from 'form-data';
const fs = require('fs');
const path = require('path')

async function getAttendantSessionID(): Promise<number> {
    let result = await checkUserDisponibility();
    return result
}

async function createNewChat(sessionID: number, contact: string): Promise<number> {
    let result = await createChat(sessionID, contact)
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

export { getAttendantSessionID, createNewChat, sendNewMessage }