import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  MessageHandlers,
  MessageModels,
  MessageRepositories,
  MessageSagas,
  MessageServices,
} from '../../@app/message';
import {
  MessageInboxApiControllers,
  MessageInboxApiHandlers,
  MessageInboxApiResolvers,
  MessageInboxApiServices,
} from './inbox';
import {
  MessageInboxSettingApiControllers,
  MessageInboxSettingApiHandlers,
  MessageInboxSettingApiResolvers,
  MessageInboxSettingApiServices,
} from './inbox-setting';
import {
  MessageMessageApiControllers,
  MessageMessageApiHandlers,
  MessageMessageApiResolvers,
  MessageMessageApiServices,
} from './message';
import { MessageSeeder } from './message.seeder';
import {
  MessageOutboxApiControllers,
  MessageOutboxApiHandlers,
  MessageOutboxApiResolvers,
  MessageOutboxApiServices,
} from './outbox';
import { MessageCheckOutboxTask } from './shared/tasks/message-check-outbox.task';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([...MessageModels])],
  controllers: [
    ...MessageMessageApiControllers,
    ...MessageOutboxApiControllers,
    ...MessageInboxApiControllers,
    ...MessageInboxSettingApiControllers,
  ],
  providers: [
    MessageCheckOutboxTask,
    MessageSeeder,
    ...MessageHandlers,
    ...MessageServices,
    ...MessageRepositories,
    ...MessageSagas,
    ...MessageMessageApiResolvers,
    ...MessageMessageApiHandlers,
    ...MessageMessageApiServices,
    ...MessageOutboxApiResolvers,
    ...MessageOutboxApiHandlers,
    ...MessageOutboxApiServices,
    ...MessageInboxApiResolvers,
    ...MessageInboxApiHandlers,
    ...MessageInboxApiServices,
    ...MessageInboxSettingApiResolvers,
    ...MessageInboxSettingApiHandlers,
    ...MessageInboxSettingApiServices,
  ],
})
export class MessageModule {}
