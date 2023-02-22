import { Whatsapp } from 'venom-bot';

export interface iStage {
    exec(params?: iStageParams): Array<string>;
}

export interface iStageParams {
    from: string,
    message?: any,
    client?: Whatsapp,
    choosenRoute?: number
}

export interface iStageStorage {
    [key: string]: {
    stage: number,
    option?: string,
    name?: string,
    email?: string
    }
}
