import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { MessageSeeder } from './message.seeder';
import { MessageModels, MessageHandlers, MessageServices, MessageRepositories, MessageSagas } from '../../@app/message';
import { MessageMessageApiControllers, MessageMessageApiResolvers, MessageMessageApiHandlers, MessageMessageApiServices } from './message';
import { MessageOutboxApiControllers, MessageOutboxApiResolvers, MessageOutboxApiHandlers, MessageOutboxApiServices } from './outbox';
import { MessageCheckOutboxTask } from './shared/tasks/message-check-outbox.task';
import { MessageInboxApiControllers, MessageInboxApiResolvers, MessageInboxApiHandlers, MessageInboxApiServices } from './inbox';
import { MessageInboxSettingApiControllers, MessageInboxSettingApiResolvers, MessageInboxSettingApiHandlers, MessageInboxSettingApiServices } from './inbox-setting';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...MessageModels,
        ]),
    ],
    controllers: [
        ...MessageMessageApiControllers,
        ...MessageOutboxApiControllers,
        ...MessageInboxApiControllers,
        ...MessageInboxSettingApiControllers
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
        ...MessageInboxSettingApiServices
    ],
})
export class MessageModule {}
