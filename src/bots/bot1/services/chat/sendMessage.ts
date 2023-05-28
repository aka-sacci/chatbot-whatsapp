import FormData from "form-data";

const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpSendMessage = process.env.HTTP_SENDMESSAGE;

export default async function sendMessage(form: FormData): Promise<void> {
    let url = httpMainUrl + '' + httpSendMessage

    await axios.post(url, form)
        .then(() => {
        })
        .catch((err: Error) => {
            return undefined
        });
}