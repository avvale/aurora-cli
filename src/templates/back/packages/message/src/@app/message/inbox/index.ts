// export commands
export { MessageCreateInboxCommand } from './application/create/message-create-inbox.command';
export { MessageCreateInboxesCommand } from './application/create/message-create-inboxes.command';
export { MessageDeleteInboxByIdCommand } from './application/delete/message-delete-inbox-by-id.command';
export { MessageDeleteInboxesCommand } from './application/delete/message-delete-inboxes.command';
export { MessageUpdateInboxByIdCommand } from './application/update/message-update-inbox-by-id.command';
export { MessageUpdateInboxesCommand } from './application/update/message-update-inboxes.command';

// export queries
export { MessageCountInboxQuery } from './application/count/message-count-inbox.query';
export { MessageFindInboxByIdQuery } from './application/find/message-find-inbox-by-id.query';
export { MessageFindInboxQuery } from './application/find/message-find-inbox.query';
export { MessageGetInboxesQuery } from './application/get/message-get-inboxes.query';
export { MessageMaxInboxQuery } from './application/max/message-max-inbox.query';
export { MessagePaginateInboxesQuery } from './application/paginate/message-paginate-inboxes.query';

// export mocks
export { messageMockInboxData } from './infrastructure/mock/message-mock-inbox.data';
export { MessageMockInboxRepository } from './infrastructure/mock/message-mock-inbox.repository';
export { MessageMockInboxSeeder } from './infrastructure/mock/message-mock-inbox.seeder';

// export events
export { MessageAddInboxesContextEvent } from './application/events/message-add-inboxes-context.event';
export { MessageCreatedInboxEvent } from './application/events/message-created-inbox.event';
export { MessageCreatedInboxesEvent } from './application/events/message-created-inboxes.event';
export { MessageDeletedInboxEvent } from './application/events/message-deleted-inbox.event';
export { MessageDeletedInboxesEvent } from './application/events/message-deleted-inboxes.event';
export { MessageUpdatedInboxEvent } from './application/events/message-updated-inbox.event';
export { MessageUpdatedInboxesEvent } from './application/events/message-updated-inboxes.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { MessageInbox } from './domain/message-inbox.aggregate';
export { MessageInboxMapper } from './domain/message-inbox.mapper';
export { MessageIInboxRepository } from './domain/message-inbox.repository';
export { MessageInboxResponse } from './domain/message-inbox.response';

// infrastructure
export { MessageInboxModel } from './infrastructure/sequelize/message-sequelize-inbox.model';
export { MessageSequelizeInboxRepository } from './infrastructure/sequelize/message-sequelize-inbox.repository';

// sagas
export { MessageInboxSagas } from './application/sagas/message-inbox.sagas';

// command handlers
import { MessageCreateInboxCommandHandler } from './application/create/message-create-inbox.command-handler';
import { MessageCreateInboxesCommandHandler } from './application/create/message-create-inboxes.command-handler';
import { MessageDeleteInboxByIdCommandHandler } from './application/delete/message-delete-inbox-by-id.command-handler';
import { MessageDeleteInboxesCommandHandler } from './application/delete/message-delete-inboxes.command-handler';
import { MessageUpdateInboxByIdCommandHandler } from './application/update/message-update-inbox-by-id.command-handler';
import { MessageUpdateInboxesCommandHandler } from './application/update/message-update-inboxes.command-handler';

// query handlers
import { MessageCountInboxQueryHandler } from './application/count/message-count-inbox.query-handler';
import { MessageFindInboxByIdQueryHandler } from './application/find/message-find-inbox-by-id.query-handler';
import { MessageFindInboxQueryHandler } from './application/find/message-find-inbox.query-handler';
import { MessageGetInboxesQueryHandler } from './application/get/message-get-inboxes.query-handler';
import { MessageMaxInboxQueryHandler } from './application/max/message-max-inbox.query-handler';
import { MessagePaginateInboxesQueryHandler } from './application/paginate/message-paginate-inboxes.query-handler';

// event handlers
import { MessageCreatedInboxEventHandler } from './application/events/message-created-inbox.event-handler';
import { MessageCreatedInboxesEventHandler } from './application/events/message-created-inboxes.event-handler';
import { MessageDeletedInboxEventHandler } from './application/events/message-deleted-inbox.event-handler';
import { MessageDeletedInboxesEventHandler } from './application/events/message-deleted-inboxes.event-handler';
import { MessageUpdatedInboxEventHandler } from './application/events/message-updated-inbox.event-handler';
import { MessageUpdatedInboxesEventHandler } from './application/events/message-updated-inboxes.event-handler';

// services
import { MessageCountInboxService } from './application/count/message-count-inbox.service';
import { MessageCreateInboxService } from './application/create/message-create-inbox.service';
import { MessageCreateInboxesService } from './application/create/message-create-inboxes.service';
import { MessageDeleteInboxByIdService } from './application/delete/message-delete-inbox-by-id.service';
import { MessageDeleteInboxesService } from './application/delete/message-delete-inboxes.service';
import { MessageFindInboxByIdService } from './application/find/message-find-inbox-by-id.service';
import { MessageFindInboxService } from './application/find/message-find-inbox.service';
import { MessageGetInboxesService } from './application/get/message-get-inboxes.service';
import { MessageMaxInboxService } from './application/max/message-max-inbox.service';
import { MessagePaginateInboxesService } from './application/paginate/message-paginate-inboxes.service';
import { MessageUpdateInboxByIdService } from './application/update/message-update-inbox-by-id.service';
import { MessageUpdateInboxesService } from './application/update/message-update-inboxes.service';

export const MessageInboxHandlers = [
    // commands
    MessageCreateInboxCommandHandler,
    MessageCreateInboxesCommandHandler,
    MessageUpdateInboxByIdCommandHandler,
    MessageUpdateInboxesCommandHandler,
    MessageDeleteInboxByIdCommandHandler,
    MessageDeleteInboxesCommandHandler,

    // queries
    MessagePaginateInboxesQueryHandler,
    MessageGetInboxesQueryHandler,
    MessageFindInboxQueryHandler,
    MessageFindInboxByIdQueryHandler,
    MessageCountInboxQueryHandler,
    MessageMaxInboxQueryHandler,

    // events
    MessageCreatedInboxEventHandler,
    MessageCreatedInboxesEventHandler,
    MessageUpdatedInboxEventHandler,
    MessageUpdatedInboxesEventHandler,
    MessageDeletedInboxEventHandler,
    MessageDeletedInboxesEventHandler,
];

export const MessageInboxServices = [
    MessageCreateInboxService,
    MessageCreateInboxesService,
    MessagePaginateInboxesService,
    MessageGetInboxesService,
    MessageFindInboxService,
    MessageFindInboxByIdService,
    MessageCountInboxService,
    MessageMaxInboxService,
    MessageUpdateInboxByIdService,
    MessageUpdateInboxesService,
    MessageDeleteInboxByIdService,
    MessageDeleteInboxesService,
];
