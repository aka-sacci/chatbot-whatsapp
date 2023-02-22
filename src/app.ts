import { create } from 'venom-bot';


function createBot(sessionName: string, bot: Function) {
    create({
        session: 'store',
        multidevice: true,
        headless: false,
    })
        .then((client) => bot(client))
        .catch((err: Error) => {
            console.log(err)
            process.exit(1)
        })

}

export default createBot