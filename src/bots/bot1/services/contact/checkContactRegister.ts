import { iContactData } from "../../../../@types/myTypes";

const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpCheckContactRegister = process.env.HTTP_CHECKCONTACTREGISTER;

export default async function checkContactRegister(phone: string): Promise<boolean> {
    let url = httpMainUrl + '' + httpCheckContactRegister + '' + phone
    let response = await axios.get(url)
        .then(() => {
            return true
        })
        .catch((err: Error) => {
            let errorCode = err.message.substring(err.message.length - 3)
            if (errorCode === "404") return false
            else { return undefined }
        });
    return response
}