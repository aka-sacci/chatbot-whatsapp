import {
    optionOneRouteInit,
    optionTwoRouteInit,
    optionThreeRouteInit,
    optionFourRouteInit
} from './bots/bot1/stages/routes'

export const routes = [
    {
        descricao: 'Receitas Manipuladas',
        option: optionOneRouteInit,
        stage: 5
    },
    {
        descricao: 'Receitas Comuns',
        option: optionTwoRouteInit,
        stage: 6
    },
    {
        descricao: 'Compra de produtos/medicamentos',
        option: optionThreeRouteInit,
        stage: 7
    },
    {
        descricao: 'Falar com atendente',
        option: optionFourRouteInit,
        stage: 8
    }
  ];