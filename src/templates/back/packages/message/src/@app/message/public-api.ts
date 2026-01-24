/* eslint-disable comma-dangle */
import {
  MessageIInboxRepository,
  MessageInboxHandlers,
  MessageInboxModel,
  MessageInboxSagas,
  MessageInboxServices,
  MessageSequelizeInboxRepository,
} from './inbox';
import {
  MessageIInboxSettingRepository,
  MessageInboxSettingHandlers,
  MessageInboxSettingModel,
  MessageInboxSettingSagas,
  MessageInboxSettingServices,
  MessageSequelizeInboxSettingRepository,
} from './inbox-setting';
import {
  MessageIMessageRepository,
  MessageMessageHandlers,
  MessageMessageModel,
  MessageMessageSagas,
  MessageMessageServices,
  MessageSequelizeMessageRepository,
} from './message';
import {
  MessageIOutboxRepository,
  MessageOutboxHandlers,
  MessageOutboxModel,
  MessageOutboxSagas,
  MessageOutboxServices,
  MessageSequelizeOutboxRepository,
} from './outbox';

export const MessageHandlers = [
  ...MessageInboxHandlers,
  ...MessageMessageHandlers,
  ...MessageInboxSettingHandlers,
  ...MessageOutboxHandlers,
];
export const MessageServices = [
  ...MessageInboxServices,
  ...MessageMessageServices,
  ...MessageInboxSettingServices,
  ...MessageOutboxServices,
];
export const MessageModels = [
  MessageInboxModel,
  MessageMessageModel,
  MessageInboxSettingModel,
  MessageOutboxModel,
];
export const MessageRepositories = [
  {
    provide: MessageIInboxRepository,
    useClass: MessageSequelizeInboxRepository,
  },
  {
    provide: MessageIMessageRepository,
    useClass: MessageSequelizeMessageRepository,
  },
  {
    provide: MessageIInboxSettingRepository,
    useClass: MessageSequelizeInboxSettingRepository,
  },
  {
    provide: MessageIOutboxRepository,
    useClass: MessageSequelizeOutboxRepository,
  },
];
export const MessageSagas = [
  MessageInboxSagas,
  MessageMessageSagas,
  MessageInboxSettingSagas,
  MessageOutboxSagas,
];
