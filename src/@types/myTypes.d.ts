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
    async execDecryptFile(message: Message, client: Whatsapp, fileExtension: string): Promise<String | undefined>
}

export interface iStageParams {
    from: string,
    message: Message,
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
        inactivityTimer?: boolean,
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
    filename: buffer | undefined,
    fileExtension: string |undefined 
}