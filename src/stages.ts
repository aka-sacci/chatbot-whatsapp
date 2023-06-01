import { stageZero, stageFive, stageFour, stageOne, stageSix, stageTwo, stageThree, stageSeven, stageEight, stageNine, stageTen } from './bots/bot1/stages';
import { stageTest } from './bots/bot1/stages/stageTest';

import { stageStorage } from './stageStorage';

export const stages = [
  {
    descricao: 'Welcome and Menu',
    stage: stageTest,
  },
  {
    descricao: 'Show saved contact data OR collect his name',
    stage: stageOne,
  },
  {
    descricao: 'Data confirmation (if contact is registered)',
    stage: stageTwo,
  },
  {
    descricao: 'Get contact Name',
    stage: stageThree,
  },
  {
    descricao: 'Get contact Street',
    stage: stageFour,
  },
  {
    descricao: 'Get contact house number',
    stage: stageFive,
  },
  {
    descricao: 'Get contact CEP',
    stage: stageSix,
  },
  {
    descricao: 'Get contact Complement',
    stage: stageSeven,
  },
  {
    descricao: 'Update or create a contact',
    stage: stageEight,
  },
  {
    descricao: 'Check if are free attendants',
    stage: stageNine
  },
  {
    descricao: 'Talk',
    stage: stageTen
  }
];

export function getStage(from: string): number {
  if (stageStorage[from]) {
    return stageStorage[from].stage;
  }
  stageStorage[from] = {
    stage: 0,
    email: "",
    name: "",
    option: "",
    contactData: {
      name: "",
      phone: "",
      registered: false,
      address: {
        street: "",
        number: 0,
        district: "",
        cep: 0
      }
    },
    inactivityTimer: false,
    userDisponibilityTimer: false,
    syncMessageLoop: false,
    chatID: 0
  };

  return stageStorage[from].stage;
}