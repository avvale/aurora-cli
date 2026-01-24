/* eslint-disable comma-dangle */
import {
  WhatsappIMessageRepository,
  WhatsappMessageHandlers,
  WhatsappMessageModel,
  WhatsappMessageSagas,
  WhatsappMessageServices,
  WhatsappSequelizeMessageRepository,
} from './message';

export const WhatsappHandlers = [...WhatsappMessageHandlers];
export const WhatsappServices = [...WhatsappMessageServices];
export const WhatsappModels = [WhatsappMessageModel];
export const WhatsappRepositories = [
  {
    provide: WhatsappIMessageRepository,
    useClass: WhatsappSequelizeMessageRepository,
  },
];
export const WhatsappSagas = [WhatsappMessageSagas];
