/* eslint-disable comma-dangle */
import { MessageInboxHandlers, MessageInboxServices, MessageInboxModel, MessageIInboxRepository, MessageSequelizeInboxRepository, MessageInboxSagas } from './inbox';

export const MessageHandlers = [
    ...MessageInboxHandlers
];
export const MessageServices = [
    ...MessageInboxServices
];
export const MessageModels = [
    MessageInboxModel
];
export const MessageRepositories = [
    {
        provide : MessageIInboxRepository,
        useClass: MessageSequelizeInboxRepository,
    }
];
export const MessageSagas = [
    MessageInboxSagas
];