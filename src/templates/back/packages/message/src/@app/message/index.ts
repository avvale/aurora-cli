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
  ...MessageMessageHandlers,
  ...MessageOutboxHandlers,
  ...MessageInboxHandlers,
  ...MessageInboxSettingHandlers,
];
export const MessageServices = [
  ...MessageMessageServices,
  ...MessageOutboxServices,
  ...MessageInboxServices,
  ...MessageInboxSettingServices,
];
export const MessageModels = [
  MessageMessageModel,
  MessageOutboxModel,
  MessageInboxModel,
  MessageInboxSettingModel,
];
export const MessageRepositories = [
  {
    provide: MessageIMessageRepository,
    useClass: MessageSequelizeMessageRepository,
  },
  {
    provide: MessageIOutboxRepository,
    useClass: MessageSequelizeOutboxRepository,
  },
  {
    provide: MessageIInboxRepository,
    useClass: MessageSequelizeInboxRepository,
  },
  {
    provide: MessageIInboxSettingRepository,
    useClass: MessageSequelizeInboxSettingRepository,
  },
];
export const MessageSagas = [
  MessageMessageSagas,
  MessageOutboxSagas,
  MessageInboxSagas,
  MessageInboxSettingSagas,
];
