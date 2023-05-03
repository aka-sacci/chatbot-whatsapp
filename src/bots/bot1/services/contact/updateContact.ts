import { iContactData } from "../../../../@types/myTypes";

const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();

const httpMainUrl = process.env.HTTP_MAIN;
const httpUpdateContact = process.env.HTTP_UPDATECONTACT;

export default async function updateContact(contactData: iContactData): Promise<void> {
    let url = httpMainUrl + '' + httpUpdateContact
    await axios.post(url, { ...contactData })
        .then()
        .catch();
}