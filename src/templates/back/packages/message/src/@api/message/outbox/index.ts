// export DTOs
export { MessageCreateOutboxDto } from './dto/message-create-outbox.dto';
export { MessageOutboxDto } from './dto/message-outbox.dto';
export { MessageUpdateOutboxByIdDto } from './dto/message-update-outbox-by-id.dto';
export { MessageUpdateOutboxesDto } from './dto/message-update-outboxes.dto';

// export handlers
export { MessageCreateOutboxHandler } from './handlers/message-create-outbox.handler';
export { MessageCreateOutboxesHandler } from './handlers/message-create-outboxes.handler';
export { MessageDeleteOutboxByIdHandler } from './handlers/message-delete-outbox-by-id.handler';
export { MessageDeleteOutboxesHandler } from './handlers/message-delete-outboxes.handler';
export { MessageFindOutboxByIdHandler } from './handlers/message-find-outbox-by-id.handler';
export { MessageFindOutboxHandler } from './handlers/message-find-outbox.handler';
export { MessageGetOutboxesHandler } from './handlers/message-get-outboxes.handler';
export { MessagePaginateOutboxesHandler } from './handlers/message-paginate-outboxes.handler';
export { MessageUpdateOutboxByIdHandler } from './handlers/message-update-outbox-by-id.handler';
export { MessageUpdateOutboxesHandler } from './handlers/message-update-outboxes.handler';

// export controllers
export { MessageCreateOutboxController } from './controllers/message-create-outbox.controller';
export { MessageCreateOutboxesController } from './controllers/message-create-outboxes.controller';
export { MessageDeleteOutboxByIdController } from './controllers/message-delete-outbox-by-id.controller';
export { MessageDeleteOutboxesController } from './controllers/message-delete-outboxes.controller';
export { MessageFindOutboxByIdController } from './controllers/message-find-outbox-by-id.controller';
export { MessageFindOutboxController } from './controllers/message-find-outbox.controller';
export { MessageGetOutboxesController } from './controllers/message-get-outboxes.controller';
export { MessagePaginateOutboxesController } from './controllers/message-paginate-outboxes.controller';
export { MessageUpdateOutboxByIdController } from './controllers/message-update-outbox-by-id.controller';
export { MessageUpdateOutboxesController } from './controllers/message-update-outboxes.controller';

// export resolvers
export { MessageCreateOutboxResolver } from './resolvers/message-create-outbox.resolver';
export { MessageCreateOutboxesResolver } from './resolvers/message-create-outboxes.resolver';
export { MessageDeleteOutboxByIdResolver } from './resolvers/message-delete-outbox-by-id.resolver';
export { MessageDeleteOutboxesResolver } from './resolvers/message-delete-outboxes.resolver';
export { MessageFindOutboxByIdResolver } from './resolvers/message-find-outbox-by-id.resolver';
export { MessageFindOutboxResolver } from './resolvers/message-find-outbox.resolver';
export { MessageGetOutboxesResolver } from './resolvers/message-get-outboxes.resolver';
export { MessagePaginateOutboxesResolver } from './resolvers/message-paginate-outboxes.resolver';
export { MessageUpdateOutboxByIdResolver } from './resolvers/message-update-outbox-by-id.resolver';
export { MessageUpdateOutboxesResolver } from './resolvers/message-update-outboxes.resolver';

// import controllers
import { MessageCreateOutboxController } from './controllers/message-create-outbox.controller';
import { MessageCreateOutboxesController } from './controllers/message-create-outboxes.controller';
import { MessageDeleteOutboxByIdController } from './controllers/message-delete-outbox-by-id.controller';
import { MessageDeleteOutboxesController } from './controllers/message-delete-outboxes.controller';
import { MessageFindOutboxByIdController } from './controllers/message-find-outbox-by-id.controller';
import { MessageFindOutboxController } from './controllers/message-find-outbox.controller';
import { MessageGetOutboxesController } from './controllers/message-get-outboxes.controller';
import { MessagePaginateOutboxesController } from './controllers/message-paginate-outboxes.controller';
import { MessageUpdateOutboxByIdController } from './controllers/message-update-outbox-by-id.controller';
import { MessageUpdateOutboxesController } from './controllers/message-update-outboxes.controller';

// import resolvers
import { MessageCreateOutboxResolver } from './resolvers/message-create-outbox.resolver';
import { MessageCreateOutboxesResolver } from './resolvers/message-create-outboxes.resolver';
import { MessageDeleteOutboxByIdResolver } from './resolvers/message-delete-outbox-by-id.resolver';
import { MessageDeleteOutboxesResolver } from './resolvers/message-delete-outboxes.resolver';
import { MessageFindOutboxByIdResolver } from './resolvers/message-find-outbox-by-id.resolver';
import { MessageFindOutboxResolver } from './resolvers/message-find-outbox.resolver';
import { MessageGetOutboxesResolver } from './resolvers/message-get-outboxes.resolver';
import { MessagePaginateOutboxesResolver } from './resolvers/message-paginate-outboxes.resolver';
import { MessageUpdateOutboxByIdResolver } from './resolvers/message-update-outbox-by-id.resolver';
import { MessageUpdateOutboxesResolver } from './resolvers/message-update-outboxes.resolver';

// import handlers
import { MessageCreateOutboxHandler } from './handlers/message-create-outbox.handler';
import { MessageCreateOutboxesHandler } from './handlers/message-create-outboxes.handler';
import { MessageDeleteOutboxByIdHandler } from './handlers/message-delete-outbox-by-id.handler';
import { MessageDeleteOutboxesHandler } from './handlers/message-delete-outboxes.handler';
import { MessageFindOutboxByIdHandler } from './handlers/message-find-outbox-by-id.handler';
import { MessageFindOutboxHandler } from './handlers/message-find-outbox.handler';
import { MessageGetOutboxesHandler } from './handlers/message-get-outboxes.handler';
import { MessagePaginateOutboxesHandler } from './handlers/message-paginate-outboxes.handler';
import { MessageUpdateOutboxByIdHandler } from './handlers/message-update-outbox-by-id.handler';
import { MessageUpdateOutboxesHandler } from './handlers/message-update-outboxes.handler';

// import seeder
import { MessageOutboxSeeder } from './seeder/message-outbox.seeder';

export const MessageOutboxApiControllers = [
  MessageCreateOutboxController,
  MessageCreateOutboxesController,
  MessagePaginateOutboxesController,
  MessageGetOutboxesController,
  MessageFindOutboxByIdController,
  MessageFindOutboxController,
  MessageUpdateOutboxByIdController,
  MessageUpdateOutboxesController,
  MessageDeleteOutboxByIdController,
  MessageDeleteOutboxesController,
];

export const MessageOutboxApiResolvers = [
  MessageCreateOutboxResolver,
  MessageCreateOutboxesResolver,
  MessagePaginateOutboxesResolver,
  MessageGetOutboxesResolver,
  MessageFindOutboxByIdResolver,
  MessageFindOutboxResolver,
  MessageUpdateOutboxByIdResolver,
  MessageUpdateOutboxesResolver,
  MessageDeleteOutboxByIdResolver,
  MessageDeleteOutboxesResolver,
];

export const MessageOutboxApiHandlers = [
  MessageCreateOutboxHandler,
  MessageCreateOutboxesHandler,
  MessagePaginateOutboxesHandler,
  MessageGetOutboxesHandler,
  MessageFindOutboxByIdHandler,
  MessageFindOutboxHandler,
  MessageUpdateOutboxByIdHandler,
  MessageUpdateOutboxesHandler,
  MessageDeleteOutboxByIdHandler,
  MessageDeleteOutboxesHandler,
];

export const MessageOutboxApiServices = [MessageOutboxSeeder];
