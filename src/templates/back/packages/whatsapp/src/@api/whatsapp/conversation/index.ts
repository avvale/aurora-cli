// export DTOs
export { WhatsappConversationDto } from './dto/whatsapp-conversation.dto';
export { WhatsappUpdateConversationByIdDto } from './dto/whatsapp-update-conversation-by-id.dto';
export { WhatsappUpdateConversationsDto } from './dto/whatsapp-update-conversations.dto';

// export handlers
export { WhatsappDeleteConversationByIdHandler } from './handlers/whatsapp-delete-conversation-by-id.handler';
export { WhatsappDeleteConversationsHandler } from './handlers/whatsapp-delete-conversations.handler';
export { WhatsappFindConversationByIdHandler } from './handlers/whatsapp-find-conversation-by-id.handler';
export { WhatsappFindConversationHandler } from './handlers/whatsapp-find-conversation.handler';
export { WhatsappGetConversationsHandler } from './handlers/whatsapp-get-conversations.handler';
export { WhatsappPaginateConversationsHandler } from './handlers/whatsapp-paginate-conversations.handler';
export { WhatsappUpdateConversationByIdHandler } from './handlers/whatsapp-update-conversation-by-id.handler';
export { WhatsappUpdateConversationsHandler } from './handlers/whatsapp-update-conversations.handler';

// export controllers
export { WhatsappDeleteConversationByIdController } from './controllers/whatsapp-delete-conversation-by-id.controller';
export { WhatsappDeleteConversationsController } from './controllers/whatsapp-delete-conversations.controller';
export { WhatsappFindConversationByIdController } from './controllers/whatsapp-find-conversation-by-id.controller';
export { WhatsappFindConversationController } from './controllers/whatsapp-find-conversation.controller';
export { WhatsappGetConversationsController } from './controllers/whatsapp-get-conversations.controller';
export { WhatsappPaginateConversationsController } from './controllers/whatsapp-paginate-conversations.controller';
export { WhatsappUpdateConversationByIdController } from './controllers/whatsapp-update-conversation-by-id.controller';
export { WhatsappUpdateConversationsController } from './controllers/whatsapp-update-conversations.controller';

// export resolvers
export { WhatsappDeleteConversationByIdResolver } from './resolvers/whatsapp-delete-conversation-by-id.resolver';
export { WhatsappDeleteConversationsResolver } from './resolvers/whatsapp-delete-conversations.resolver';
export { WhatsappFindConversationByIdResolver } from './resolvers/whatsapp-find-conversation-by-id.resolver';
export { WhatsappFindConversationResolver } from './resolvers/whatsapp-find-conversation.resolver';
export { WhatsappGetConversationsResolver } from './resolvers/whatsapp-get-conversations.resolver';
export { WhatsappPaginateConversationsResolver } from './resolvers/whatsapp-paginate-conversations.resolver';
export { WhatsappUpdateConversationByIdResolver } from './resolvers/whatsapp-update-conversation-by-id.resolver';
export { WhatsappUpdateConversationsResolver } from './resolvers/whatsapp-update-conversations.resolver';

// import controllers
import { WhatsappDeleteConversationByIdController } from './controllers/whatsapp-delete-conversation-by-id.controller';
import { WhatsappDeleteConversationsController } from './controllers/whatsapp-delete-conversations.controller';
import { WhatsappFindConversationByIdController } from './controllers/whatsapp-find-conversation-by-id.controller';
import { WhatsappFindConversationController } from './controllers/whatsapp-find-conversation.controller';
import { WhatsappGetConversationsController } from './controllers/whatsapp-get-conversations.controller';
import { WhatsappPaginateConversationsController } from './controllers/whatsapp-paginate-conversations.controller';
import { WhatsappUpdateConversationByIdController } from './controllers/whatsapp-update-conversation-by-id.controller';
import { WhatsappUpdateConversationsController } from './controllers/whatsapp-update-conversations.controller';

// import resolvers
import { WhatsappDeleteConversationByIdResolver } from './resolvers/whatsapp-delete-conversation-by-id.resolver';
import { WhatsappDeleteConversationsResolver } from './resolvers/whatsapp-delete-conversations.resolver';
import { WhatsappFindConversationByIdResolver } from './resolvers/whatsapp-find-conversation-by-id.resolver';
import { WhatsappFindConversationResolver } from './resolvers/whatsapp-find-conversation.resolver';
import { WhatsappGetConversationsResolver } from './resolvers/whatsapp-get-conversations.resolver';
import { WhatsappPaginateConversationsResolver } from './resolvers/whatsapp-paginate-conversations.resolver';
import { WhatsappUpdateConversationByIdResolver } from './resolvers/whatsapp-update-conversation-by-id.resolver';
import { WhatsappUpdateConversationsResolver } from './resolvers/whatsapp-update-conversations.resolver';

// import handlers
import { WhatsappDeleteConversationByIdHandler } from './handlers/whatsapp-delete-conversation-by-id.handler';
import { WhatsappDeleteConversationsHandler } from './handlers/whatsapp-delete-conversations.handler';
import { WhatsappFindConversationByIdHandler } from './handlers/whatsapp-find-conversation-by-id.handler';
import { WhatsappFindConversationHandler } from './handlers/whatsapp-find-conversation.handler';
import { WhatsappGetConversationsHandler } from './handlers/whatsapp-get-conversations.handler';
import { WhatsappPaginateConversationsHandler } from './handlers/whatsapp-paginate-conversations.handler';
import { WhatsappUpdateConversationByIdHandler } from './handlers/whatsapp-update-conversation-by-id.handler';
import { WhatsappUpdateConversationsHandler } from './handlers/whatsapp-update-conversations.handler';

// import seeder
import { WhatsappConversationSeeder } from './seeder/whatsapp-conversation.seeder';

export const WhatsappConversationApiControllers = [
  WhatsappPaginateConversationsController,
  WhatsappGetConversationsController,
  WhatsappFindConversationByIdController,
  WhatsappFindConversationController,
  WhatsappUpdateConversationByIdController,
  WhatsappUpdateConversationsController,
  WhatsappDeleteConversationByIdController,
  WhatsappDeleteConversationsController,
];

export const WhatsappConversationApiResolvers = [
  WhatsappPaginateConversationsResolver,
  WhatsappGetConversationsResolver,
  WhatsappFindConversationByIdResolver,
  WhatsappFindConversationResolver,
  WhatsappUpdateConversationByIdResolver,
  WhatsappUpdateConversationsResolver,
  WhatsappDeleteConversationByIdResolver,
  WhatsappDeleteConversationsResolver,
];

export const WhatsappConversationApiHandlers = [
  WhatsappPaginateConversationsHandler,
  WhatsappGetConversationsHandler,
  WhatsappFindConversationByIdHandler,
  WhatsappFindConversationHandler,
  WhatsappUpdateConversationByIdHandler,
  WhatsappUpdateConversationsHandler,
  WhatsappDeleteConversationByIdHandler,
  WhatsappDeleteConversationsHandler,
];

export const WhatsappConversationApiServices = [WhatsappConversationSeeder];
