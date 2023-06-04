import { Whatsapp } from "venom-bot";
import { iExecGetMediaDataReturn, iStageParams, iTalkStage } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import { sendErrorMessage, sendNewMessage } from "../providers/chat";
import { inactivityTimerSync } from "../providers/session";
var db = require('mime-db')

export const stageTen: iTalkStage = {
    async exec(params: iStageParams) {
        //Toda vez que ele for executado, significa que chegou uma nova mensagem do cliente
        //Sendo assim, toda vez que ele for chamado, deverá ser inserido uma nova mensagem.
        inactivityTimerSync(params)
        console.log("Send Message")
        let type = params.message.type
        let sendMessageObject: any = {
            chat: stageStorage[params.from].chatID
        }

        try {
            if (type === "reply") {
                sendMessageObject.talkID = params.message.id._serialized
                sendMessageObject.type = params.message.subtype
                sendMessageObject.content = params.message.body
                sendMessageObject.replyTo = params.message.quotedStanzaID
                if (params.message.subtype !== "chat") {
                    let returnResult = await this.execGetMediaData(params.message.subtype, params.message, params.client, params.message.mimetype)
                    sendMessageObject.fileBuffer = returnResult.fileBuffer
                    sendMessageObject.fileExtension = returnResult.fileExtension
                    sendMessageObject.content = returnResult.content
                }
            } else {
                let message: any = await params.client.getMessageById(params.message.id)
                let isMedia = Object.keys(message.mediaData).length == 0 ? false : true
                sendMessageObject.talkID = message.id
                sendMessageObject.type = type
                sendMessageObject.content = message.content
                if (isMedia) {
                    let returnResult = await this.execGetMediaData(type, message, params.client, message.mediaData.mimetype)
                    sendMessageObject.fileBuffer = returnResult.fileBuffer
                    sendMessageObject.fileExtension = returnResult.fileExtension
                    sendMessageObject.content = returnResult.content
                }
            }

            await sendNewMessage({
                ...sendMessageObject
            })
        } catch (err: any) {
            if (err.name == "FILE_UNSUPORTED") {
                let talkID = await params.client.sendText(params.from, "Esse tipo de arquivo não é suportado! Por favor, tente novamente!")
                    .then(async (result: any) => {
                        return result.to._serialized
                    }).catch(error => console.error('Error when sending message', error));

                if (talkID === undefined) {
                    return
                }

                await sendErrorMessage({
                    chat: stageStorage[params.from].chatID,
                    type: 'chat',
                    content: 'Esse tipo de arquivo não é suportado! Por favor, tente novamente!',
                    talkID,
                    fileBuffer: undefined,
                    fileExtension: undefined,
                    replyTo: undefined
                })

            } else {
                params.client.sendText(params.from, "Houve um erro ao enviar a sua mensagem. Por favor, tente novamente").then(async () => {
                }).catch(error => console.error('Error when sending message', error));
            }
        }

    },
    async execGetMediaData(type: string, message: any, client: Whatsapp, mimetype: string): Promise<iExecGetMediaDataReturn> {
        let fileBuffer = undefined
        let fileExtension = undefined
        let content = undefined
        try {
            switch (type) {
                case "ptt":
                    fileExtension = "opus"
                    break;
                case "sticker":
                    message.clientUrl = "https://pps.whatsapp.net" + message.directPath
                    fileExtension = "png"
                    break;
                default:
                    if (db[mimetype] === undefined) {
                        let errToBeThrown = new Error
                        errToBeThrown.name = "FILE_UNSUPORTED"
                        errToBeThrown.message = "This file is not suported!"
                        throw errToBeThrown
                    }
                    fileExtension = db[mimetype].extensions[0]
                    break
            }
            message.type = type
            fileBuffer = await client.decryptFile(message);
            content = message?.caption === undefined ? "" : message?.caption

            return {
                fileBuffer,
                fileExtension,
                content
            }

        } catch (err: any) {
            let errToBeThrown = new Error
            errToBeThrown.name = err.name
            errToBeThrown.message = err.message
            throw errToBeThrown
        }
    }
}