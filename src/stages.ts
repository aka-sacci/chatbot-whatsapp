import {
    stageOne,
    stageTwo,
    stageThree,
    stageFour,
    stageFive,
    stageSix,
    stageSeven,
    stageEight,
    stageNine,
  } from './bots/bot1/stages';
  
  import { stageStorage } from './stageStorage';
  
  export const stages = [
    {
      descricao: 'Welcome and Menu',
      stage: stageOne,
    },
    {
      descricao: 'Name',
      stage: stageTwo,
    },
    {
      descricao: 'Email',
      stage: stageThree,
    },
    {
      descricao: 'Name/Email Confirmation',
      stage: stageFour,
    },
    {
      descricao: 'Redirect',
      stage: stageFive,
    },
    {
      descricao: 'Farmácia de Manipulação',
      stage: stageSix,
    },
    {
      descricao: 'Farmácia Comum',
      stage: stageSeven,
    },
    {
      descricao: 'Compra de produtos',
      stage: stageEight,
    },
    {
      descricao: 'Falar direto com revendedor',
      stage: stageNine,
    },
  ];
  
  export function getStage( from: string ): number {
    if (stageStorage[from]) {
      return stageStorage[from].stage;
    }
    stageStorage[from] = {
      stage: 0,
      email: '',
      name: '',
      option: ""
    };
  
    return stageStorage[from].stage;
  }