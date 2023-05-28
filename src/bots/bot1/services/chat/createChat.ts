import { iReturnServiceData } from "../../../../@types/myTypes";
import FormData from "form-data";

const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpCreateChat = process.env.HTTP_CREATECHAT;

export default async function createChat(form: FormData): Promise<number> {
    let url = httpMainUrl + '' + httpCreateChat
    let response = await axios.post(url, form)
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