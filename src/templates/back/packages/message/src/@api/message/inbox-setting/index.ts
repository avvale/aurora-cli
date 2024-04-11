// export DTOs
export { MessageInboxSettingDto } from './dto/message-inbox-setting.dto';
export { MessageCreateInboxSettingDto } from './dto/message-create-inbox-setting.dto';
export { MessageUpdateInboxSettingByIdDto } from './dto/message-update-inbox-setting-by-id.dto';
export { MessageUpdateInboxSettingsDto } from './dto/message-update-inbox-settings.dto';

// export handlers
export { MessageCreateInboxSettingHandler } from './handlers/message-create-inbox-setting.handler';
export { MessageCreateInboxSettingsHandler } from './handlers/message-create-inbox-settings.handler';
export { MessagePaginateInboxSettingsHandler } from './handlers/message-paginate-inbox-settings.handler';
export { MessageGetInboxSettingsHandler } from './handlers/message-get-inbox-settings.handler';
export { MessageFindInboxSettingByIdHandler } from './handlers/message-find-inbox-setting-by-id.handler';
export { MessageFindInboxSettingHandler } from './handlers/message-find-inbox-setting.handler';
export { MessageUpdateInboxSettingByIdHandler } from './handlers/message-update-inbox-setting-by-id.handler';
export { MessageUpdateInboxSettingsHandler } from './handlers/message-update-inbox-settings.handler';
export { MessageUpsertInboxSettingHandler } from './handlers/message-upsert-inbox-setting.handler';
export { MessageDeleteInboxSettingByIdHandler } from './handlers/message-delete-inbox-setting-by-id.handler';
export { MessageDeleteInboxSettingsHandler } from './handlers/message-delete-inbox-settings.handler';

// export controllers
export { MessageCreateInboxSettingController } from './controllers/message-create-inbox-setting.controller';
export { MessageCreateInboxSettingsController } from './controllers/message-create-inbox-settings.controller';
export { MessagePaginateInboxSettingsController } from './controllers/message-paginate-inbox-settings.controller';
export { MessageGetInboxSettingsController } from './controllers/message-get-inbox-settings.controller';
export { MessageFindInboxSettingByIdController } from './controllers/message-find-inbox-setting-by-id.controller';
export { MessageFindInboxSettingController } from './controllers/message-find-inbox-setting.controller';
export { MessageUpdateInboxSettingByIdController } from './controllers/message-update-inbox-setting-by-id.controller';
export { MessageUpdateInboxSettingsController } from './controllers/message-update-inbox-settings.controller';
export { MessageUpsertInboxSettingController } from './controllers/message-upsert-inbox-setting.controller';
export { MessageDeleteInboxSettingByIdController } from './controllers/message-delete-inbox-setting-by-id.controller';
export { MessageDeleteInboxSettingsController } from './controllers/message-delete-inbox-settings.controller';

// export resolvers
export { MessageCreateInboxSettingResolver } from './resolvers/message-create-inbox-setting.resolver';
export { MessageCreateInboxSettingsResolver } from './resolvers/message-create-inbox-settings.resolver';
export { MessagePaginateInboxSettingsResolver } from './resolvers/message-paginate-inbox-settings.resolver';
export { MessageGetInboxSettingsResolver } from './resolvers/message-get-inbox-settings.resolver';
export { MessageFindInboxSettingByIdResolver } from './resolvers/message-find-inbox-setting-by-id.resolver';
export { MessageFindInboxSettingResolver } from './resolvers/message-find-inbox-setting.resolver';
export { MessageUpdateInboxSettingByIdResolver } from './resolvers/message-update-inbox-setting-by-id.resolver';
export { MessageUpdateInboxSettingsResolver } from './resolvers/message-update-inbox-settings.resolver';
export { MessageUpsertInboxSettingResolver } from './resolvers/message-upsert-inbox-setting.resolver';
export { MessageDeleteInboxSettingByIdResolver } from './resolvers/message-delete-inbox-setting-by-id.resolver';
export { MessageDeleteInboxSettingsResolver } from './resolvers/message-delete-inbox-settings.resolver';

// import controllers
import { MessageCreateInboxSettingController } from './controllers/message-create-inbox-setting.controller';
import { MessageCreateInboxSettingsController } from './controllers/message-create-inbox-settings.controller';
import { MessagePaginateInboxSettingsController } from './controllers/message-paginate-inbox-settings.controller';
import { MessageGetInboxSettingsController } from './controllers/message-get-inbox-settings.controller';
import { MessageFindInboxSettingByIdController } from './controllers/message-find-inbox-setting-by-id.controller';
import { MessageFindInboxSettingController } from './controllers/message-find-inbox-setting.controller';
import { MessageUpdateInboxSettingByIdController } from './controllers/message-update-inbox-setting-by-id.controller';
import { MessageUpdateInboxSettingsController } from './controllers/message-update-inbox-settings.controller';
import { MessageUpsertInboxSettingController } from './controllers/message-upsert-inbox-setting.controller';
import { MessageDeleteInboxSettingByIdController } from './controllers/message-delete-inbox-setting-by-id.controller';
import { MessageDeleteInboxSettingsController } from './controllers/message-delete-inbox-settings.controller';

// import resolvers
import { MessageCreateInboxSettingResolver } from './resolvers/message-create-inbox-setting.resolver';
import { MessageCreateInboxSettingsResolver } from './resolvers/message-create-inbox-settings.resolver';
import { MessagePaginateInboxSettingsResolver } from './resolvers/message-paginate-inbox-settings.resolver';
import { MessageGetInboxSettingsResolver } from './resolvers/message-get-inbox-settings.resolver';
import { MessageFindInboxSettingByIdResolver } from './resolvers/message-find-inbox-setting-by-id.resolver';
import { MessageFindInboxSettingResolver } from './resolvers/message-find-inbox-setting.resolver';
import { MessageUpdateInboxSettingByIdResolver } from './resolvers/message-update-inbox-setting-by-id.resolver';
import { MessageUpdateInboxSettingsResolver } from './resolvers/message-update-inbox-settings.resolver';
import { MessageUpsertInboxSettingResolver } from './resolvers/message-upsert-inbox-setting.resolver';
import { MessageDeleteInboxSettingByIdResolver } from './resolvers/message-delete-inbox-setting-by-id.resolver';
import { MessageDeleteInboxSettingsResolver } from './resolvers/message-delete-inbox-settings.resolver';

// import handlers
import { MessageCreateInboxSettingHandler } from './handlers/message-create-inbox-setting.handler';
import { MessageCreateInboxSettingsHandler } from './handlers/message-create-inbox-settings.handler';
import { MessagePaginateInboxSettingsHandler } from './handlers/message-paginate-inbox-settings.handler';
import { MessageGetInboxSettingsHandler } from './handlers/message-get-inbox-settings.handler';
import { MessageFindInboxSettingByIdHandler } from './handlers/message-find-inbox-setting-by-id.handler';
import { MessageFindInboxSettingHandler } from './handlers/message-find-inbox-setting.handler';
import { MessageUpdateInboxSettingByIdHandler } from './handlers/message-update-inbox-setting-by-id.handler';
import { MessageUpdateInboxSettingsHandler } from './handlers/message-update-inbox-settings.handler';
import { MessageUpsertInboxSettingHandler } from './handlers/message-upsert-inbox-setting.handler';
import { MessageDeleteInboxSettingByIdHandler } from './handlers/message-delete-inbox-setting-by-id.handler';
import { MessageDeleteInboxSettingsHandler } from './handlers/message-delete-inbox-settings.handler';

// import seeder
import { MessageInboxSettingSeeder } from './seeder/message-inbox-setting.seeder';

export const MessageInboxSettingApiControllers = [
    MessageCreateInboxSettingController,
    MessageCreateInboxSettingsController,
    MessagePaginateInboxSettingsController,
    MessageGetInboxSettingsController,
    MessageFindInboxSettingByIdController,
    MessageFindInboxSettingController,
    MessageUpdateInboxSettingByIdController,
    MessageUpdateInboxSettingsController,
    MessageUpsertInboxSettingController,
    MessageDeleteInboxSettingByIdController,
    MessageDeleteInboxSettingsController,
];

export const MessageInboxSettingApiResolvers = [
    MessageCreateInboxSettingResolver,
    MessageCreateInboxSettingsResolver,
    MessagePaginateInboxSettingsResolver,
    MessageGetInboxSettingsResolver,
    MessageFindInboxSettingByIdResolver,
    MessageFindInboxSettingResolver,
    MessageUpdateInboxSettingByIdResolver,
    MessageUpdateInboxSettingsResolver,
    MessageUpsertInboxSettingResolver,
    MessageDeleteInboxSettingByIdResolver,
    MessageDeleteInboxSettingsResolver,
];

export const MessageInboxSettingApiHandlers = [
    MessageCreateInboxSettingHandler,
    MessageCreateInboxSettingsHandler,
    MessagePaginateInboxSettingsHandler,
    MessageGetInboxSettingsHandler,
    MessageFindInboxSettingByIdHandler,
    MessageFindInboxSettingHandler,
    MessageUpdateInboxSettingByIdHandler,
    MessageUpdateInboxSettingsHandler,
    MessageUpsertInboxSettingHandler,
    MessageDeleteInboxSettingByIdHandler,
    MessageDeleteInboxSettingsHandler,
];

export const MessageInboxSettingApiServices = [
    MessageInboxSettingSeeder,
];
