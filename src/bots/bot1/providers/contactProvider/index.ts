import { iContactData } from "../../../../@types/myTypes";
import checkContactRegister from "../../services/contact/checkContactRegister";
import registerContact from "../../services/contact/registerContact";
import returnContactData from "../../services/contact/returnContactData";
import updateContact from "../../services/contact/updateContact";

async function isContactRegistered(phone: string): Promise<boolean> {
    let result = await checkContactRegister(phone)
    return result
}

async function getContactData(phone: string): Promise<iContactData> {
    let result = await returnContactData(phone)
    return result
}

async function updateContactData(contactData: iContactData): Promise<void> {
   await updateContact({...contactData})
}

async function createContact(contactData: iContactData): Promise<void> {
    await registerContact({...contactData})
 }


export { isContactRegistered, getContactData, updateContactData, createContact }