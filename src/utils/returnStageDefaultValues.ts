import { iStageStorage } from "../@types/myTypes";

export const stageDefaultValues = {
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
    inactivityTimer: null,
    userDisponibilityTimer: false,
    syncMessageLoop: false,
    chatID: 0
}