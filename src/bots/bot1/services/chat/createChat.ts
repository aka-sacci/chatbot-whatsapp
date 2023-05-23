import { iReturnServiceData } from "../../../../@types/myTypes";

const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpCreateChat = process.env.HTTP_CREATECHAT;

export default async function createChat(sessionID: number, contact: string): Promise<number> {
    let url = httpMainUrl + '' + httpCreateChat + '' + sessionID + '/' + contact
    let response = await axios.get(url)
        .then((chatID: iReturnServiceData) => {
            if ('chatID' in chatID.data) {
                return chatID.data.chatID
            } else {
                let errSessionID = new Error
                errSessionID.name = "ERR_CHATID_NOTFOUND"
                errSessionID.message = "404: ChatID not founded!"
            }
        })
        .catch((err: Error) => {
            return undefined
        });
    return response
}