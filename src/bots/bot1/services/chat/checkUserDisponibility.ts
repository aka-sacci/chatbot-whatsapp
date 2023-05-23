import { iReturnServiceData } from "../../../../@types/myTypes";

const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpCheckUserDisponibility = process.env.HTTP_CHECKUSERDISPONIBILITY;

export default async function checkUserDisponibility(): Promise<number> {
    let url = httpMainUrl + '' + httpCheckUserDisponibility
    let response = await axios.get(url)
        .then((session: iReturnServiceData) => {
            if ('sessionID' in session.data) {
                return session.data.sessionID
            } else {
                let errSessionID = new Error
                errSessionID.name = "ERR_SESSIONID_NOTFOUND"
                errSessionID.message = "404: SessionID not founded!"
            }
        })
        .catch((err: Error) => {
            let errorCode = err.message.substring(err.message.length - 3)
            if (errorCode === "404") return 0
            else { return undefined }
        });
    return response
}