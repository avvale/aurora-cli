/* eslint-disable comma-dangle */
import { MessageInboxHandlers, MessageInboxServices, MessageInboxModel, MessageIInboxRepository, MessageSequelizeInboxRepository, MessageInboxSagas } from './inbox';
import { MessageMessageHandlers, MessageMessageServices, MessageMessageModel, MessageIMessageRepository, MessageSequelizeMessageRepository, MessageMessageSagas } from './message';
import { MessageInboxSettingHandlers, MessageInboxSettingServices, MessageInboxSettingModel, MessageIInboxSettingRepository, MessageSequelizeInboxSettingRepository, MessageInboxSettingSagas } from './inbox-setting';
import { MessageOutboxHandlers, MessageOutboxServices, MessageOutboxModel, MessageIOutboxRepository, MessageSequelizeOutboxRepository, MessageOutboxSagas } from './outbox';

export const MessageHandlers = [
    ...MessageInboxHandlers,
    ...MessageMessageHandlers,
    ...MessageInboxSettingHandlers,
    ...MessageOutboxHandlers
];
export const MessageServices = [
    ...MessageInboxServices,
    ...MessageMessageServices,
    ...MessageInboxSettingServices,
    ...MessageOutboxServices
];
export const MessageModels = [
    MessageInboxModel,
    MessageMessageModel,
    MessageInboxSettingModel,
    MessageOutboxModel
];
export const MessageRepositories = [
    {
        provide : MessageIInboxRepository,
        useClass: MessageSequelizeInboxRepository,
    },
    {
        provide : MessageIMessageRepository,
        useClass: MessageSequelizeMessageRepository,
    },
    {
        provide : MessageIInboxSettingRepository,
        useClass: MessageSequelizeInboxSettingRepository,
    },
    {
        provide : MessageIOutboxRepository,
        useClass: MessageSequelizeOutboxRepository,
    }
];
export const MessageSagas = [
    MessageInboxSagas,
    MessageMessageSagas,
    MessageInboxSettingSagas,
    MessageOutboxSagas
];