/* eslint-disable comma-dangle */
export * from './whatsapp.types';
import { WhatsappConversationHandlers, WhatsappConversationServices, WhatsappConversationModel, WhatsappIConversationRepository, WhatsappSequelizeConversationRepository, WhatsappConversationSagas } from './conversation';
import { WhatsappMessageHandlers, WhatsappMessageServices, WhatsappMessageModel, WhatsappIMessageRepository, WhatsappSequelizeMessageRepository, WhatsappMessageSagas } from './message';


export const WhatsappHandlers = [
    ...WhatsappConversationHandlers,
    ...WhatsappMessageHandlers
];
export const WhatsappServices = [
    ...WhatsappConversationServices,
    ...WhatsappMessageServices
];
export const WhatsappModels = [
    WhatsappConversationModel,
    WhatsappMessageModel
];
export const WhatsappRepositories = [
    {
        provide : WhatsappIConversationRepository,
        useClass: WhatsappSequelizeConversationRepository
    },
    {
        provide : WhatsappIMessageRepository,
        useClass: WhatsappSequelizeMessageRepository
    }
];
export const WhatsappSagas = [
    WhatsappConversationSagas,
    WhatsappMessageSagas
];
