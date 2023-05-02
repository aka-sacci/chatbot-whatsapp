import checkContactRegister from "../../services/contact/checkContactRegister";

async function isContactRegistered(phone: string): Promise<boolean> {
    let result = await checkContactRegister(phone)
    return result
}

export { isContactRegistered }