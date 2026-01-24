// export DTOs
export { MessageCreateInboxDto } from './dto/message-create-inbox.dto';
export { MessageInboxDto } from './dto/message-inbox.dto';
export { MessageUpdateInboxByIdDto } from './dto/message-update-inbox-by-id.dto';
export { MessageUpdateInboxesDto } from './dto/message-update-inboxes.dto';

// export handlers
export { MessageCreateInboxHandler } from './handlers/message-create-inbox.handler';
export { MessageCreateInboxesHandler } from './handlers/message-create-inboxes.handler';
export { MessageDeleteInboxByIdHandler } from './handlers/message-delete-inbox-by-id.handler';
export { MessageDeleteInboxesHandler } from './handlers/message-delete-inboxes.handler';
export { MessageFindInboxByIdHandler } from './handlers/message-find-inbox-by-id.handler';
export { MessageFindInboxHandler } from './handlers/message-find-inbox.handler';
export { MessageGetInboxesHandler } from './handlers/message-get-inboxes.handler';
export { MessagePaginateInboxesHandler } from './handlers/message-paginate-inboxes.handler';
export { MessageUpdateInboxByIdHandler } from './handlers/message-update-inbox-by-id.handler';
export { MessageUpdateInboxesHandler } from './handlers/message-update-inboxes.handler';

// export controllers
export { MessageCreateInboxController } from './controllers/message-create-inbox.controller';
export { MessageCreateInboxesController } from './controllers/message-create-inboxes.controller';
export { MessageDeleteInboxByIdController } from './controllers/message-delete-inbox-by-id.controller';
export { MessageDeleteInboxesController } from './controllers/message-delete-inboxes.controller';
export { MessageFindInboxByIdController } from './controllers/message-find-inbox-by-id.controller';
export { MessageFindInboxController } from './controllers/message-find-inbox.controller';
export { MessageGetInboxesController } from './controllers/message-get-inboxes.controller';
export { MessagePaginateInboxesController } from './controllers/message-paginate-inboxes.controller';
export { MessageUpdateInboxByIdController } from './controllers/message-update-inbox-by-id.controller';
export { MessageUpdateInboxesController } from './controllers/message-update-inboxes.controller';

// export resolvers
export { MessageCreateInboxResolver } from './resolvers/message-create-inbox.resolver';
export { MessageCreateInboxesResolver } from './resolvers/message-create-inboxes.resolver';
export { MessageDeleteInboxByIdResolver } from './resolvers/message-delete-inbox-by-id.resolver';
export { MessageDeleteInboxesResolver } from './resolvers/message-delete-inboxes.resolver';
export { MessageFindInboxByIdResolver } from './resolvers/message-find-inbox-by-id.resolver';
export { MessageFindInboxResolver } from './resolvers/message-find-inbox.resolver';
export { MessageGetInboxesResolver } from './resolvers/message-get-inboxes.resolver';
export { MessagePaginateInboxesResolver } from './resolvers/message-paginate-inboxes.resolver';
export { MessageUpdateInboxByIdResolver } from './resolvers/message-update-inbox-by-id.resolver';
export { MessageUpdateInboxesResolver } from './resolvers/message-update-inboxes.resolver';

// export additionalApis
export { MessageCheckMessagesInboxController } from './controllers/message-check-messages-inbox.controller';
export { MessageCountUnreadCustomerMessageInboxController } from './controllers/message-count-unread-customer-message-inbox.controller';
export { MessageDeleteCustomerMessageInboxController } from './controllers/message-delete-customer-message-inbox.controller';
export { MessageFindCustomerMessageInboxController } from './controllers/message-find-customer-message-inbox.controller';
export { MessagePaginateCustomerMessagesInboxController } from './controllers/message-paginate-customer-messages-inbox.controller';
export { MessageReadCustomerMessageInboxController } from './controllers/message-read-customer-message-inbox.controller';
export { MessageUnreadCustomerMessageInboxController } from './controllers/message-unread-customer-message-inbox.controller';
export { MessageCheckMessagesInboxHandler } from './handlers/message-check-messages-inbox.handler';
export { MessageCountUnreadCustomerMessageInboxHandler } from './handlers/message-count-unread-customer-message-inbox.handler';
export { MessageDeleteCustomerMessageInboxHandler } from './handlers/message-delete-customer-message-inbox.handler';
export { MessageFindCustomerMessageInboxHandler } from './handlers/message-find-customer-message-inbox.handler';
export { MessagePaginateCustomerMessagesInboxHandler } from './handlers/message-paginate-customer-messages-inbox.handler';
export { MessageReadCustomerMessageInboxHandler } from './handlers/message-read-customer-message-inbox.handler';
export { MessageUnreadCustomerMessageInboxHandler } from './handlers/message-unread-customer-message-inbox.handler';
export { MessageCheckMessagesInboxResolver } from './resolvers/message-check-messages-inbox.resolver';
export { MessageCountUnreadCustomerMessageInboxResolver } from './resolvers/message-count-unread-customer-message-inbox.resolver';
export { MessageDeleteCustomerMessageInboxResolver } from './resolvers/message-delete-customer-message-inbox.resolver';
export { MessageFindCustomerMessageInboxResolver } from './resolvers/message-find-customer-message-inbox.resolver';
export { MessagePaginateCustomerMessagesInboxResolver } from './resolvers/message-paginate-customer-messages-inbox.resolver';
export { MessageReadCustomerMessageInboxResolver } from './resolvers/message-read-customer-message-inbox.resolver';
export { MessageUnreadCustomerMessageInboxResolver } from './resolvers/message-unread-customer-message-inbox.resolver';

// import controllers
import { MessageCreateInboxController } from './controllers/message-create-inbox.controller';
import { MessageCreateInboxesController } from './controllers/message-create-inboxes.controller';
import { MessageDeleteInboxByIdController } from './controllers/message-delete-inbox-by-id.controller';
import { MessageDeleteInboxesController } from './controllers/message-delete-inboxes.controller';
import { MessageFindInboxByIdController } from './controllers/message-find-inbox-by-id.controller';
import { MessageFindInboxController } from './controllers/message-find-inbox.controller';
import { MessageGetInboxesController } from './controllers/message-get-inboxes.controller';
import { MessagePaginateInboxesController } from './controllers/message-paginate-inboxes.controller';
import { MessageUpdateInboxByIdController } from './controllers/message-update-inbox-by-id.controller';
import { MessageUpdateInboxesController } from './controllers/message-update-inboxes.controller';

// import resolvers
import { MessageCreateInboxResolver } from './resolvers/message-create-inbox.resolver';
import { MessageCreateInboxesResolver } from './resolvers/message-create-inboxes.resolver';
import { MessageDeleteInboxByIdResolver } from './resolvers/message-delete-inbox-by-id.resolver';
import { MessageDeleteInboxesResolver } from './resolvers/message-delete-inboxes.resolver';
import { MessageFindInboxByIdResolver } from './resolvers/message-find-inbox-by-id.resolver';
import { MessageFindInboxResolver } from './resolvers/message-find-inbox.resolver';
import { MessageGetInboxesResolver } from './resolvers/message-get-inboxes.resolver';
import { MessagePaginateInboxesResolver } from './resolvers/message-paginate-inboxes.resolver';
import { MessageUpdateInboxByIdResolver } from './resolvers/message-update-inbox-by-id.resolver';
import { MessageUpdateInboxesResolver } from './resolvers/message-update-inboxes.resolver';

// import handlers
import { MessageCreateInboxHandler } from './handlers/message-create-inbox.handler';
import { MessageCreateInboxesHandler } from './handlers/message-create-inboxes.handler';
import { MessageDeleteInboxByIdHandler } from './handlers/message-delete-inbox-by-id.handler';
import { MessageDeleteInboxesHandler } from './handlers/message-delete-inboxes.handler';
import { MessageFindInboxByIdHandler } from './handlers/message-find-inbox-by-id.handler';
import { MessageFindInboxHandler } from './handlers/message-find-inbox.handler';
import { MessageGetInboxesHandler } from './handlers/message-get-inboxes.handler';
import { MessagePaginateInboxesHandler } from './handlers/message-paginate-inboxes.handler';
import { MessageUpdateInboxByIdHandler } from './handlers/message-update-inbox-by-id.handler';
import { MessageUpdateInboxesHandler } from './handlers/message-update-inboxes.handler';

// import seeder
import { MessageInboxSeeder } from './seeder/message-inbox.seeder';

// import additionalApis
import { MessageCheckMessagesInboxController } from './controllers/message-check-messages-inbox.controller';
import { MessageCountUnreadCustomerMessageInboxController } from './controllers/message-count-unread-customer-message-inbox.controller';
import { MessageDeleteCustomerMessageInboxController } from './controllers/message-delete-customer-message-inbox.controller';
import { MessageFindCustomerMessageInboxController } from './controllers/message-find-customer-message-inbox.controller';
import { MessagePaginateCustomerMessagesInboxController } from './controllers/message-paginate-customer-messages-inbox.controller';
import { MessageReadCustomerMessageInboxController } from './controllers/message-read-customer-message-inbox.controller';
import { MessageUnreadCustomerMessageInboxController } from './controllers/message-unread-customer-message-inbox.controller';
import { MessageCheckMessagesInboxHandler } from './handlers/message-check-messages-inbox.handler';
import { MessageCountUnreadCustomerMessageInboxHandler } from './handlers/message-count-unread-customer-message-inbox.handler';
import { MessageDeleteCustomerMessageInboxHandler } from './handlers/message-delete-customer-message-inbox.handler';
import { MessageFindCustomerMessageInboxHandler } from './handlers/message-find-customer-message-inbox.handler';
import { MessagePaginateCustomerMessagesInboxHandler } from './handlers/message-paginate-customer-messages-inbox.handler';
import { MessageReadCustomerMessageInboxHandler } from './handlers/message-read-customer-message-inbox.handler';
import { MessageUnreadCustomerMessageInboxHandler } from './handlers/message-unread-customer-message-inbox.handler';
import { MessageCheckMessagesInboxResolver } from './resolvers/message-check-messages-inbox.resolver';
import { MessageCountUnreadCustomerMessageInboxResolver } from './resolvers/message-count-unread-customer-message-inbox.resolver';
import { MessageDeleteCustomerMessageInboxResolver } from './resolvers/message-delete-customer-message-inbox.resolver';
import { MessageFindCustomerMessageInboxResolver } from './resolvers/message-find-customer-message-inbox.resolver';
import { MessagePaginateCustomerMessagesInboxResolver } from './resolvers/message-paginate-customer-messages-inbox.resolver';
import { MessageReadCustomerMessageInboxResolver } from './resolvers/message-read-customer-message-inbox.resolver';
import { MessageUnreadCustomerMessageInboxResolver } from './resolvers/message-unread-customer-message-inbox.resolver';

export const MessageInboxApiControllers = [
  MessageCreateInboxController,
  MessageCreateInboxesController,
  MessagePaginateInboxesController,
  MessageGetInboxesController,
  MessageFindInboxByIdController,
  MessageFindInboxController,
  MessageUpdateInboxByIdController,
  MessageUpdateInboxesController,
  MessageDeleteInboxByIdController,
  MessageDeleteInboxesController,

  // additionalApis
  MessageCheckMessagesInboxController,
  MessagePaginateCustomerMessagesInboxController,
  MessageFindCustomerMessageInboxController,
  MessageDeleteCustomerMessageInboxController,
  MessageReadCustomerMessageInboxController,
  MessageUnreadCustomerMessageInboxController,
  MessageCountUnreadCustomerMessageInboxController,
];

export const MessageInboxApiResolvers = [
  MessageCreateInboxResolver,
  MessageCreateInboxesResolver,
  MessagePaginateInboxesResolver,
  MessageGetInboxesResolver,
  MessageFindInboxByIdResolver,
  MessageFindInboxResolver,
  MessageUpdateInboxByIdResolver,
  MessageUpdateInboxesResolver,
  MessageDeleteInboxByIdResolver,
  MessageDeleteInboxesResolver,

  // additionalApis
  MessageCheckMessagesInboxResolver,
  MessagePaginateCustomerMessagesInboxResolver,
  MessageFindCustomerMessageInboxResolver,
  MessageDeleteCustomerMessageInboxResolver,
  MessageReadCustomerMessageInboxResolver,
  MessageUnreadCustomerMessageInboxResolver,
  MessageCountUnreadCustomerMessageInboxResolver,
];

export const MessageInboxApiHandlers = [
  MessageCreateInboxHandler,
  MessageCreateInboxesHandler,
  MessagePaginateInboxesHandler,
  MessageGetInboxesHandler,
  MessageFindInboxByIdHandler,
  MessageFindInboxHandler,
  MessageUpdateInboxByIdHandler,
  MessageUpdateInboxesHandler,
  MessageDeleteInboxByIdHandler,
  MessageDeleteInboxesHandler,

  // additionalApis
  MessageCheckMessagesInboxHandler,
  MessagePaginateCustomerMessagesInboxHandler,
  MessageFindCustomerMessageInboxHandler,
  MessageDeleteCustomerMessageInboxHandler,
  MessageReadCustomerMessageInboxHandler,
  MessageUnreadCustomerMessageInboxHandler,
  MessageCountUnreadCustomerMessageInboxHandler,
];

export const MessageInboxApiServices = [MessageInboxSeeder];
