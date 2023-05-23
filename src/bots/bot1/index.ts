import { Whatsapp } from 'venom-bot';
import { getStage, stages } from '../../stages';
import setDelay from '../../utils/setDelay';

async function bot1(client: Whatsapp) {

  client.onMessage(async (message) => {
    if (!message.isGroupMsg) {
      const currentStage = getStage(message.from);
      if (currentStage <= 8) {
        const messageResponse = await stages[currentStage].stage.exec({
          from: message.from,
          message: message,
          client
        });

        if (messageResponse) {
          for (var i = 0; i < messageResponse.length; i++) {
            await setDelay(1500);
            client.sendText(message.from, messageResponse[i]).then(async () => {
            }).catch(error => console.error('Error when sending message', error));
          }
        }
      } if (currentStage == 9) {
        await stages[9].stage.exec({
          from: message.from,
          message: message,
          client
        })
      }
    }
  });

}

export default bot1
