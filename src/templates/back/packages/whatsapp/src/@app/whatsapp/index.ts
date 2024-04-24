/* eslint-disable comma-dangle */
export * from './whatsapp.types';
import { WhatsappConversationHandlers, WhatsappConversationServices, WhatsappConversationModel, WhatsappIConversationRepository, WhatsappSequelizeConversationRepository, WhatsappConversationSagas } from './conversation';
import { WhatsappMessageHandlers, WhatsappMessageServices, WhatsappMessageModel, WhatsappIMessageRepository, WhatsappSequelizeMessageRepository, WhatsappMessageSagas } from './message';
import { WhatsappTimelineHandlers, WhatsappTimelineServices, WhatsappTimelineModel, WhatsappITimelineRepository, WhatsappSequelizeTimelineRepository, WhatsappTimelineSagas } from './timeline';

export const WhatsappHandlers = [
    ...WhatsappConversationHandlers,
    ...WhatsappMessageHandlers,
    ...WhatsappTimelineHandlers
];
export const WhatsappServices = [
    ...WhatsappConversationServices,
    ...WhatsappMessageServices,
    ...WhatsappTimelineServices
];
export const WhatsappModels = [
    WhatsappConversationModel,
    WhatsappMessageModel,
    WhatsappTimelineModel
];
export const WhatsappRepositories = [
    {
        provide : WhatsappIConversationRepository,
        useClass: WhatsappSequelizeConversationRepository
    },
    {
        provide : WhatsappIMessageRepository,
        useClass: WhatsappSequelizeMessageRepository
    },
    {
        provide : WhatsappITimelineRepository,
        useClass: WhatsappSequelizeTimelineRepository
    }
];
export const WhatsappSagas = [
    WhatsappConversationSagas,
    WhatsappMessageSagas,
    WhatsappTimelineSagas
];
