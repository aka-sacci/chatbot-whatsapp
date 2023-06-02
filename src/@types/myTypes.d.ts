import { Message, Whatsapp } from 'venom-bot';

export interface iStage {
    async exec(params?: iStageParams): Promise<Array<string>>;
}

export interface iCreateTalkStage {
    async exec(params?: iStageParams): Promise<void>,
    async execCreateChat(attendantSession: number, params: iStageParams): Promise<void>
    async execCreateSyncLoop(params: iStageParams): Promise<void>
}

export interface iTalkStage {
    async exec(params?: iStageParams): Promise<void>,
    async execGetMediaData(type: string, message: any, client: Whatsapp, mimetype: string): Promise<iExecGetMediaDataReturn>
}

export interface iStageParams {
    from: string,
    message: any,
    client: Whatsapp,
    choosenRoute?: number
}

export interface iStageStorage {
    [key: string]: {
        stage: number,
        option?: string,
        name?: string,
        email?: string,
        contactData: iContactData,
        registered?: boolean,
        comeFromStage?: number,
        inactivityTimer: null | NodeJS.Timeout,
        userDisponibilityTimer?: boolean
        syncMessageLoop: boolean,
        chatID: number
    }
}

export interface iContactAddress {
    street: string,
    number: number,
    district: string,
    cep: number,
    complement?: string
}

export interface iContactData {
    phone: string,
    name: string,
    registered: boolean,
    address?: iContactAddress
}

export interface iReturnServiceData {
    data: iContactData | iReturnUserDisponibilityData | iReturnChatIDData
}

export interface iReturnUserDisponibilityData {
    sessionID: number
}

export interface iReturnChatIDData {
    chatID: number
}

export interface iSendMessageProps {
    chat: number,
    type: string,
    content: string,
    talkID: string,
    fileBuffer: buffer | undefined,
    fileExtension: string | undefined,
    replyTo: string | undefined
}

export interface iCreateNewChatProps {
    sessionID: number,
    contact: string,
    userPicBuffer: buffer | undefined,
}

export interface iExecGetMediaDataReturn {
    fileBuffer: Buffer,
    fileExtension: string,
    content: string | undefined
}