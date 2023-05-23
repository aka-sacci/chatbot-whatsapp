import { Whatsapp } from 'venom-bot';

export interface iStage {
    async exec(params?: iStageParams): Promise<Array<string>>;
}

export interface iTalkStage {
    async exec(params?: iStageParams): Promise<void>
}

export interface iStageParams {
    from: string,
    message?: any,
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
        inactivityTimer?: string,
        userDisponibilityTimer?: string

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