// export DTOs
export { WhatsappMessageDto } from './dto/whatsapp-message.dto';
export { WhatsappCreateMessageDto } from './dto/whatsapp-create-message.dto';
export { WhatsappUpdateMessageByIdDto } from './dto/whatsapp-update-message-by-id.dto';
export { WhatsappUpdateMessagesDto } from './dto/whatsapp-update-messages.dto';

// export handlers
export { WhatsappCreateMessageHandler } from './handlers/whatsapp-create-message.handler';
export { WhatsappCreateMessagesHandler } from './handlers/whatsapp-create-messages.handler';
export { WhatsappPaginateMessagesHandler } from './handlers/whatsapp-paginate-messages.handler';
export { WhatsappGetMessagesHandler } from './handlers/whatsapp-get-messages.handler';
export { WhatsappFindMessageByIdHandler } from './handlers/whatsapp-find-message-by-id.handler';
export { WhatsappFindMessageHandler } from './handlers/whatsapp-find-message.handler';
export { WhatsappUpdateMessageByIdHandler } from './handlers/whatsapp-update-message-by-id.handler';
export { WhatsappUpdateMessagesHandler } from './handlers/whatsapp-update-messages.handler';
export { WhatsappUpsertMessageHandler } from './handlers/whatsapp-upsert-message.handler';
export { WhatsappDeleteMessageByIdHandler } from './handlers/whatsapp-delete-message-by-id.handler';
export { WhatsappDeleteMessagesHandler } from './handlers/whatsapp-delete-messages.handler';

// export controllers
export { WhatsappCreateMessageController } from './controllers/whatsapp-create-message.controller';
export { WhatsappCreateMessagesController } from './controllers/whatsapp-create-messages.controller';
export { WhatsappPaginateMessagesController } from './controllers/whatsapp-paginate-messages.controller';
export { WhatsappGetMessagesController } from './controllers/whatsapp-get-messages.controller';
export { WhatsappFindMessageByIdController } from './controllers/whatsapp-find-message-by-id.controller';
export { WhatsappFindMessageController } from './controllers/whatsapp-find-message.controller';
export { WhatsappUpdateMessageByIdController } from './controllers/whatsapp-update-message-by-id.controller';
export { WhatsappUpdateMessagesController } from './controllers/whatsapp-update-messages.controller';
export { WhatsappUpsertMessageController } from './controllers/whatsapp-upsert-message.controller';
export { WhatsappDeleteMessageByIdController } from './controllers/whatsapp-delete-message-by-id.controller';
export { WhatsappDeleteMessagesController } from './controllers/whatsapp-delete-messages.controller';

// export resolvers
export { WhatsappCreateMessageResolver } from './resolvers/whatsapp-create-message.resolver';
export { WhatsappCreateMessagesResolver } from './resolvers/whatsapp-create-messages.resolver';
export { WhatsappPaginateMessagesResolver } from './resolvers/whatsapp-paginate-messages.resolver';
export { WhatsappGetMessagesResolver } from './resolvers/whatsapp-get-messages.resolver';
export { WhatsappFindMessageByIdResolver } from './resolvers/whatsapp-find-message-by-id.resolver';
export { WhatsappFindMessageResolver } from './resolvers/whatsapp-find-message.resolver';
export { WhatsappUpdateMessageByIdResolver } from './resolvers/whatsapp-update-message-by-id.resolver';
export { WhatsappUpdateMessagesResolver } from './resolvers/whatsapp-update-messages.resolver';
export { WhatsappUpsertMessageResolver } from './resolvers/whatsapp-upsert-message.resolver';
export { WhatsappDeleteMessageByIdResolver } from './resolvers/whatsapp-delete-message-by-id.resolver';
export { WhatsappDeleteMessagesResolver } from './resolvers/whatsapp-delete-messages.resolver';

// import controllers
import { WhatsappCreateMessageController } from './controllers/whatsapp-create-message.controller';
import { WhatsappCreateMessagesController } from './controllers/whatsapp-create-messages.controller';
import { WhatsappPaginateMessagesController } from './controllers/whatsapp-paginate-messages.controller';
import { WhatsappGetMessagesController } from './controllers/whatsapp-get-messages.controller';
import { WhatsappFindMessageByIdController } from './controllers/whatsapp-find-message-by-id.controller';
import { WhatsappFindMessageController } from './controllers/whatsapp-find-message.controller';
import { WhatsappUpdateMessageByIdController } from './controllers/whatsapp-update-message-by-id.controller';
import { WhatsappUpdateMessagesController } from './controllers/whatsapp-update-messages.controller';
import { WhatsappUpsertMessageController } from './controllers/whatsapp-upsert-message.controller';
import { WhatsappDeleteMessageByIdController } from './controllers/whatsapp-delete-message-by-id.controller';
import { WhatsappDeleteMessagesController } from './controllers/whatsapp-delete-messages.controller';

// import resolvers
import { WhatsappCreateMessageResolver } from './resolvers/whatsapp-create-message.resolver';
import { WhatsappCreateMessagesResolver } from './resolvers/whatsapp-create-messages.resolver';
import { WhatsappPaginateMessagesResolver } from './resolvers/whatsapp-paginate-messages.resolver';
import { WhatsappGetMessagesResolver } from './resolvers/whatsapp-get-messages.resolver';
import { WhatsappFindMessageByIdResolver } from './resolvers/whatsapp-find-message-by-id.resolver';
import { WhatsappFindMessageResolver } from './resolvers/whatsapp-find-message.resolver';
import { WhatsappUpdateMessageByIdResolver } from './resolvers/whatsapp-update-message-by-id.resolver';
import { WhatsappUpdateMessagesResolver } from './resolvers/whatsapp-update-messages.resolver';
import { WhatsappUpsertMessageResolver } from './resolvers/whatsapp-upsert-message.resolver';
import { WhatsappDeleteMessageByIdResolver } from './resolvers/whatsapp-delete-message-by-id.resolver';
import { WhatsappDeleteMessagesResolver } from './resolvers/whatsapp-delete-messages.resolver';

// import handlers
import { WhatsappCreateMessageHandler } from './handlers/whatsapp-create-message.handler';
import { WhatsappCreateMessagesHandler } from './handlers/whatsapp-create-messages.handler';
import { WhatsappPaginateMessagesHandler } from './handlers/whatsapp-paginate-messages.handler';
import { WhatsappGetMessagesHandler } from './handlers/whatsapp-get-messages.handler';
import { WhatsappFindMessageByIdHandler } from './handlers/whatsapp-find-message-by-id.handler';
import { WhatsappFindMessageHandler } from './handlers/whatsapp-find-message.handler';
import { WhatsappUpdateMessageByIdHandler } from './handlers/whatsapp-update-message-by-id.handler';
import { WhatsappUpdateMessagesHandler } from './handlers/whatsapp-update-messages.handler';
import { WhatsappUpsertMessageHandler } from './handlers/whatsapp-upsert-message.handler';
import { WhatsappDeleteMessageByIdHandler } from './handlers/whatsapp-delete-message-by-id.handler';
import { WhatsappDeleteMessagesHandler } from './handlers/whatsapp-delete-messages.handler';

// import seeder
import { WhatsappMessageSeeder } from './seeder/whatsapp-message.seeder';

export const WhatsappMessageApiControllers = [
    WhatsappCreateMessageController,
    WhatsappCreateMessagesController,
    WhatsappPaginateMessagesController,
    WhatsappGetMessagesController,
    WhatsappFindMessageByIdController,
    WhatsappFindMessageController,
    WhatsappUpdateMessageByIdController,
    WhatsappUpdateMessagesController,
    WhatsappUpsertMessageController,
    WhatsappDeleteMessageByIdController,
    WhatsappDeleteMessagesController,
];

export const WhatsappMessageApiResolvers = [
    WhatsappCreateMessageResolver,
    WhatsappCreateMessagesResolver,
    WhatsappPaginateMessagesResolver,
    WhatsappGetMessagesResolver,
    WhatsappFindMessageByIdResolver,
    WhatsappFindMessageResolver,
    WhatsappUpdateMessageByIdResolver,
    WhatsappUpdateMessagesResolver,
    WhatsappUpsertMessageResolver,
    WhatsappDeleteMessageByIdResolver,
    WhatsappDeleteMessagesResolver,
];

export const WhatsappMessageApiHandlers = [
    WhatsappCreateMessageHandler,
    WhatsappCreateMessagesHandler,
    WhatsappPaginateMessagesHandler,
    WhatsappGetMessagesHandler,
    WhatsappFindMessageByIdHandler,
    WhatsappFindMessageHandler,
    WhatsappUpdateMessageByIdHandler,
    WhatsappUpdateMessagesHandler,
    WhatsappUpsertMessageHandler,
    WhatsappDeleteMessageByIdHandler,
    WhatsappDeleteMessagesHandler,
];

export const WhatsappMessageApiServices = [
    WhatsappMessageSeeder,
];
