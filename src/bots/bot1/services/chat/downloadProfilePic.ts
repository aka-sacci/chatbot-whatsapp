const axios = require('axios');
axios.defaults.withCredentials = true
require('dotenv').config();


export default async function downloadProfilePic(url: string): Promise<Buffer | undefined> {

    let result = await axios.get(url, {
        responseType: 'arraybuffer'
    })
        .then((response: any) => {
            const buffer = Buffer.from(response.data, 'binary');
            return buffer
        })
        .catch((err: Error) => {
            return undefined
        });

        return result
}