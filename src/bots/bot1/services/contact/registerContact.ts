import { iContactData } from "../../../../@types/myTypes";

const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpRegisterContact = process.env.HTTP_REGISTERCONTACT;

export default async function registerContact(contactData: iContactData): Promise<void> {
    let url = httpMainUrl + '' + httpRegisterContact
    await axios.post(url, { ...contactData })
        .then()
        .catch();
}