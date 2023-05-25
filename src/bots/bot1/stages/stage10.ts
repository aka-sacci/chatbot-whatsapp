import { Message, Whatsapp } from "venom-bot";
import { iStageParams, iTalkStage } from "../../../@types/myTypes";
import { stageStorage } from "../../../stageStorage";
import { sendNewMessage } from "../providers/chat";
const fs = require('fs');
const path = require('path')
var db = require('mime-db')

export const stageTen: iTalkStage = {
    async exec(params: iStageParams) {
        //Toda vez que ele for executado, significa que chegou uma nova mensagem do cliente
        //Sendo assim, toda vez que ele for chamado, deverá ser inserido uma nova mensagem.
        let chatID = stageStorage[params.from].chatID
        let type = params.message.type
        let content = params.message.body
        let message: any = await params.client.getMessageById(params.message.id)
        let isMedia = Object.keys(message.mediaData).length == 0 ? false : true
        let fileName = undefined
        let fileExtension = undefined

        if (isMedia) {
            let mediaType = message.type
            fileExtension = mediaType === "ptt" ? "opus" : db[message.mediaData.mimetype].extensions[0]
            fileName = await params.client.decryptFile(message);
            content = message?.caption === undefined ? "" : message?.caption
        }

        await sendNewMessage({
            chat: chatID,
            type,
            content: content,
            filename: fileName,
            fileExtension
        })

    },
    async execDecryptFile(message: Message, client: Whatsapp, fileExtension: string): Promise<String | undefined> {
        try {
            const buffer = await client.decryptFile(message);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const filePath = path.join(process.cwd(), '/src/assets/')
            let fileName
            fileName = uniqueSuffix + "." + fileExtension
            let savePath = undefined
            savePath = filePath + fileName

            fs.writeFile(savePath, buffer, (err: Error) => {
                if (err) {
                    fileName =  undefined
                }
            });
            return fileName
        } catch (error) {
            return undefined
        }
    }
}