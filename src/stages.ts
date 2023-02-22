import { iStageStorage } from './@types/myTypes';
import {
    stageOne,
    stageTwo,
    stageThree,
    stageFour,
    stageFive,
  } from './bots/bot1/stages';
  
  import { stageStorage } from './stageStorage';
  
  export const stages = [
    {
      descricao: 'Welcome',
      stage: stageOne,
    },
    {
      descricao: 'Menu',
      stage: stageTwo,
    },
    {
      descricao: 'Address',
      stage: stageThree,
    },
    {
      descricao: 'Bill',
      stage: stageFour,
    },
    {
      descricao: 'Assistent',
      stage: stageFive,
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