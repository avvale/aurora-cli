/* eslint-disable comma-dangle */
import { MessageInboxHandlers, MessageInboxServices, MessageInboxModel, MessageIInboxRepository, MessageSequelizeInboxRepository, MessageInboxSagas } from './inbox';
import { MessageMessageHandlers, MessageMessageServices, MessageMessageModel, MessageIMessageRepository, MessageSequelizeMessageRepository, MessageMessageSagas } from './message';

export const MessageHandlers = [
    ...MessageInboxHandlers,
    ...MessageMessageHandlers
];
export const MessageServices = [
    ...MessageInboxServices,
    ...MessageMessageServices
];
export const MessageModels = [
    MessageInboxModel,
    MessageMessageModel
];
export const MessageRepositories = [
    {
        provide : MessageIInboxRepository,
        useClass: MessageSequelizeInboxRepository,
    },
    {
        provide : MessageIMessageRepository,
        useClass: MessageSequelizeMessageRepository,
    }
];
export const MessageSagas = [
    MessageInboxSagas,
    MessageMessageSagas
];