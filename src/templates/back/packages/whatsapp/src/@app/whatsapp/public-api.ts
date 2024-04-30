/* eslint-disable comma-dangle */
import { WhatsappMessageHandlers, WhatsappMessageServices, WhatsappMessageModel, WhatsappIMessageRepository, WhatsappSequelizeMessageRepository, WhatsappMessageSagas } from './message';

export const WhatsappHandlers = [
    ...WhatsappMessageHandlers
];
export const WhatsappServices = [
    ...WhatsappMessageServices
];
export const WhatsappModels = [
    WhatsappMessageModel
];
export const WhatsappRepositories = [
    {
        provide : WhatsappIMessageRepository,
        useClass: WhatsappSequelizeMessageRepository
    }
];
export const WhatsappSagas = [
    WhatsappMessageSagas
];