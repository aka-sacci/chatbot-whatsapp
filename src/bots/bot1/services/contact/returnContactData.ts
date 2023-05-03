import { iContactData } from "../../../../@types/myTypes";

const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpReturnContactData = process.env.HTTP_RETURNCONTACTDARA;

export default async function returnContactData(phone: string): Promise<iContactData> {
    let url = httpMainUrl + '' + httpReturnContactData + '' + phone
    let response = await axios.get(url)
        .then((contactData: iContactData) => {
            return contactData
        })
        .catch((err: Error) => {
            let errorCode = err.message.substring(err.message.length - 3)
            if (errorCode === "404") return false
            else { return undefined }
        });
    return response
}