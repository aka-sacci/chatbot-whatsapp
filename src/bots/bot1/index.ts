import { Whatsapp } from 'venom-bot';
import { getStage, stages } from '../../stages';
import setDelay from '../../utils/setDelay';

async function bot1(client: Whatsapp) {

  client.onMessage(async (message) => {
    if (!message.isGroupMsg) {

      const currentStage = getStage(message.from);
      if (currentStage != 9) {
        const messageResponse = await stages[currentStage].stage.exec({
          from: message.from,
          message: message.body,
          client
        });

        if (messageResponse) {
          for (var i = 0; i < messageResponse.length; i++) {
            client.startTyping;
            await setDelay(1500);
            client.stopTyping;
            client.sendText(message.from, messageResponse[i]).then(async () => {
              console.log('Message sent.');
            }).catch(error => console.error('Error when sending message', error));
          }
        }

      }
    } else {
      //notifica no db
    }
  });
}

export default bot1
