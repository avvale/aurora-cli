/* eslint-disable comma-dangle */
export * from './whatsapp.types';
import {
  WhatsappConversationHandlers,
  WhatsappConversationModel,
  WhatsappConversationSagas,
  WhatsappConversationServices,
  WhatsappIConversationRepository,
  WhatsappSequelizeConversationRepository,
} from './conversation';
import {
  WhatsappIMessageRepository,
  WhatsappMessageHandlers,
  WhatsappMessageModel,
  WhatsappMessageSagas,
  WhatsappMessageServices,
  WhatsappSequelizeMessageRepository,
} from './message';
import {
  WhatsappITimelineRepository,
  WhatsappSequelizeTimelineRepository,
  WhatsappTimelineHandlers,
  WhatsappTimelineModel,
  WhatsappTimelineSagas,
  WhatsappTimelineServices,
} from './timeline';

export const WhatsappHandlers = [
  ...WhatsappConversationHandlers,
  ...WhatsappMessageHandlers,
  ...WhatsappTimelineHandlers,
];
export const WhatsappServices = [
  ...WhatsappConversationServices,
  ...WhatsappMessageServices,
  ...WhatsappTimelineServices,
];
export const WhatsappModels = [
  WhatsappConversationModel,
  WhatsappMessageModel,
  WhatsappTimelineModel,
];
export const WhatsappRepositories = [
  {
    provide: WhatsappIConversationRepository,
    useClass: WhatsappSequelizeConversationRepository,
  },
  {
    provide: WhatsappIMessageRepository,
    useClass: WhatsappSequelizeMessageRepository,
  },
  {
    provide: WhatsappITimelineRepository,
    useClass: WhatsappSequelizeTimelineRepository,
  },
];
export const WhatsappSagas = [
  WhatsappConversationSagas,
  WhatsappMessageSagas,
  WhatsappTimelineSagas,
];
