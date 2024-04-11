import { MessageMessageHandlers, MessageMessageServices, MessageMessageModel, MessageIMessageRepository, MessageSequelizeMessageRepository, MessageMessageSagas } from './message';
import { MessageOutboxHandlers, MessageOutboxServices, MessageOutboxModel, MessageIOutboxRepository, MessageSequelizeOutboxRepository, MessageOutboxSagas } from './outbox';
import { MessageInboxHandlers, MessageInboxServices, MessageInboxModel, MessageIInboxRepository, MessageSequelizeInboxRepository, MessageInboxSagas } from './inbox';
import { MessageInboxSettingHandlers, MessageInboxSettingServices, MessageInboxSettingModel, MessageIInboxSettingRepository, MessageSequelizeInboxSettingRepository, MessageInboxSettingSagas } from './inbox-setting';

export const MessageHandlers = [
    ...MessageMessageHandlers,
    ...MessageOutboxHandlers,
    ...MessageInboxHandlers,
    ...MessageInboxSettingHandlers
];
export const MessageServices = [
    ...MessageMessageServices,
    ...MessageOutboxServices,
    ...MessageInboxServices,
    ...MessageInboxSettingServices
];
export const MessageModels = [
    MessageMessageModel,
    MessageOutboxModel,
    MessageInboxModel,
    MessageInboxSettingModel
];
export const MessageRepositories = [
    {
        provide : MessageIMessageRepository,
        useClass: MessageSequelizeMessageRepository
    },
    {
        provide : MessageIOutboxRepository,
        useClass: MessageSequelizeOutboxRepository
    },
    {
        provide : MessageIInboxRepository,
        useClass: MessageSequelizeInboxRepository
    },
    {
        provide : MessageIInboxSettingRepository,
        useClass: MessageSequelizeInboxSettingRepository
    }
];
export const MessageSagas = [
    MessageMessageSagas,
    MessageOutboxSagas,
    MessageInboxSagas,
    MessageInboxSettingSagas
];
