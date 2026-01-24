// export DTOs
export { WhatsappMessageDto } from './dto/whatsapp-message.dto';
export { WhatsappUpdateMessageByIdDto } from './dto/whatsapp-update-message-by-id.dto';
export { WhatsappUpdateMessagesDto } from './dto/whatsapp-update-messages.dto';

// export handlers
export { WhatsappDeleteMessageByIdHandler } from './handlers/whatsapp-delete-message-by-id.handler';
export { WhatsappDeleteMessagesHandler } from './handlers/whatsapp-delete-messages.handler';
export { WhatsappFindMessageByIdHandler } from './handlers/whatsapp-find-message-by-id.handler';
export { WhatsappFindMessageHandler } from './handlers/whatsapp-find-message.handler';
export { WhatsappGetMessagesHandler } from './handlers/whatsapp-get-messages.handler';
export { WhatsappPaginateMessagesHandler } from './handlers/whatsapp-paginate-messages.handler';
export { WhatsappUpdateMessageByIdHandler } from './handlers/whatsapp-update-message-by-id.handler';
export { WhatsappUpdateMessagesHandler } from './handlers/whatsapp-update-messages.handler';

// export controllers
export { WhatsappDeleteMessageByIdController } from './controllers/whatsapp-delete-message-by-id.controller';
export { WhatsappDeleteMessagesController } from './controllers/whatsapp-delete-messages.controller';
export { WhatsappFindMessageByIdController } from './controllers/whatsapp-find-message-by-id.controller';
export { WhatsappFindMessageController } from './controllers/whatsapp-find-message.controller';
export { WhatsappGetMessagesController } from './controllers/whatsapp-get-messages.controller';
export { WhatsappPaginateMessagesController } from './controllers/whatsapp-paginate-messages.controller';
export { WhatsappUpdateMessageByIdController } from './controllers/whatsapp-update-message-by-id.controller';
export { WhatsappUpdateMessagesController } from './controllers/whatsapp-update-messages.controller';

// export resolvers
export { WhatsappDeleteMessageByIdResolver } from './resolvers/whatsapp-delete-message-by-id.resolver';
export { WhatsappDeleteMessagesResolver } from './resolvers/whatsapp-delete-messages.resolver';
export { WhatsappFindMessageByIdResolver } from './resolvers/whatsapp-find-message-by-id.resolver';
export { WhatsappFindMessageResolver } from './resolvers/whatsapp-find-message.resolver';
export { WhatsappGetMessagesResolver } from './resolvers/whatsapp-get-messages.resolver';
export { WhatsappPaginateMessagesResolver } from './resolvers/whatsapp-paginate-messages.resolver';
export { WhatsappUpdateMessageByIdResolver } from './resolvers/whatsapp-update-message-by-id.resolver';
export { WhatsappUpdateMessagesResolver } from './resolvers/whatsapp-update-messages.resolver';

// import controllers
import { WhatsappDeleteMessageByIdController } from './controllers/whatsapp-delete-message-by-id.controller';
import { WhatsappDeleteMessagesController } from './controllers/whatsapp-delete-messages.controller';
import { WhatsappFindMessageByIdController } from './controllers/whatsapp-find-message-by-id.controller';
import { WhatsappFindMessageController } from './controllers/whatsapp-find-message.controller';
import { WhatsappGetMessagesController } from './controllers/whatsapp-get-messages.controller';
import { WhatsappPaginateMessagesController } from './controllers/whatsapp-paginate-messages.controller';
import { WhatsappUpdateMessageByIdController } from './controllers/whatsapp-update-message-by-id.controller';
import { WhatsappUpdateMessagesController } from './controllers/whatsapp-update-messages.controller';

// import resolvers
import { WhatsappDeleteMessageByIdResolver } from './resolvers/whatsapp-delete-message-by-id.resolver';
import { WhatsappDeleteMessagesResolver } from './resolvers/whatsapp-delete-messages.resolver';
import { WhatsappFindMessageByIdResolver } from './resolvers/whatsapp-find-message-by-id.resolver';
import { WhatsappFindMessageResolver } from './resolvers/whatsapp-find-message.resolver';
import { WhatsappGetMessagesResolver } from './resolvers/whatsapp-get-messages.resolver';
import { WhatsappPaginateMessagesResolver } from './resolvers/whatsapp-paginate-messages.resolver';
import { WhatsappUpdateMessageByIdResolver } from './resolvers/whatsapp-update-message-by-id.resolver';
import { WhatsappUpdateMessagesResolver } from './resolvers/whatsapp-update-messages.resolver';

// import handlers
import { WhatsappDeleteMessageByIdHandler } from './handlers/whatsapp-delete-message-by-id.handler';
import { WhatsappDeleteMessagesHandler } from './handlers/whatsapp-delete-messages.handler';
import { WhatsappFindMessageByIdHandler } from './handlers/whatsapp-find-message-by-id.handler';
import { WhatsappFindMessageHandler } from './handlers/whatsapp-find-message.handler';
import { WhatsappGetMessagesHandler } from './handlers/whatsapp-get-messages.handler';
import { WhatsappPaginateMessagesHandler } from './handlers/whatsapp-paginate-messages.handler';
import { WhatsappUpdateMessageByIdHandler } from './handlers/whatsapp-update-message-by-id.handler';
import { WhatsappUpdateMessagesHandler } from './handlers/whatsapp-update-messages.handler';

// import seeder
import { WhatsappMessageSeeder } from './seeder/whatsapp-message.seeder';

export const WhatsappMessageApiControllers = [
  WhatsappPaginateMessagesController,
  WhatsappGetMessagesController,
  WhatsappFindMessageByIdController,
  WhatsappFindMessageController,
  WhatsappUpdateMessageByIdController,
  WhatsappUpdateMessagesController,
  WhatsappDeleteMessageByIdController,
  WhatsappDeleteMessagesController,
];

export const WhatsappMessageApiResolvers = [
  WhatsappPaginateMessagesResolver,
  WhatsappGetMessagesResolver,
  WhatsappFindMessageByIdResolver,
  WhatsappFindMessageResolver,
  WhatsappUpdateMessageByIdResolver,
  WhatsappUpdateMessagesResolver,
  WhatsappDeleteMessageByIdResolver,
  WhatsappDeleteMessagesResolver,
];

export const WhatsappMessageApiHandlers = [
  WhatsappPaginateMessagesHandler,
  WhatsappGetMessagesHandler,
  WhatsappFindMessageByIdHandler,
  WhatsappFindMessageHandler,
  WhatsappUpdateMessageByIdHandler,
  WhatsappUpdateMessagesHandler,
  WhatsappDeleteMessageByIdHandler,
  WhatsappDeleteMessagesHandler,
];

export const WhatsappMessageApiServices = [WhatsappMessageSeeder];
