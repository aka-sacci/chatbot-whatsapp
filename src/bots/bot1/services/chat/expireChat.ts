const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpExpireChat = process.env.HTTP_EXPIRECHAT;

export default async function expireChat(chatID: number, expiredBy: "inactivity" | "user" | "contact"): Promise<boolean> {
    let url = httpMainUrl + '' + httpExpireChat + '' + chatID + '/' + expiredBy
    let response = await axios.get(url)
        .then(() => {
            return true
        })
        .catch((err: Error) => {
            return false
        });
    return response
}