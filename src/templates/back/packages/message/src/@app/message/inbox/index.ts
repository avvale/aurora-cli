// export commands
export { MessageCreateInboxCommand } from './application/create/message-create-inbox.command';
export { MessageCreateInboxesCommand } from './application/create/message-create-inboxes.command';
export { MessageUpdateInboxByIdCommand } from './application/update/message-update-inbox-by-id.command';
export { MessageUpdateInboxesCommand } from './application/update/message-update-inboxes.command';
export { MessageUpdateAndIncrementInboxesCommand } from './application/update/message-update-and-increment-inboxes.command';
export { MessageUpsertInboxCommand } from './application/upsert/message-upsert-inbox.command';
export { MessageDeleteInboxByIdCommand } from './application/delete/message-delete-inbox-by-id.command';
export { MessageDeleteInboxesCommand } from './application/delete/message-delete-inboxes.command';

// export queries
export { MessagePaginateInboxesQuery } from './application/paginate/message-paginate-inboxes.query';
export { MessageGetInboxesQuery } from './application/get/message-get-inboxes.query';
export { MessageFindInboxQuery } from './application/find/message-find-inbox.query';
export { MessageFindInboxByIdQuery } from './application/find/message-find-inbox-by-id.query';
export { MessageRawSQLInboxesQuery } from './application/raw-sql/message-raw-sql-inboxes.query';
export { MessageCountInboxQuery } from './application/count/message-count-inbox.query';
export { MessageMaxInboxQuery } from './application/max/message-max-inbox.query';
export { MessageMinInboxQuery } from './application/min/message-min-inbox.query';
export { MessageSumInboxQuery } from './application/sum/message-sum-inbox.query';

// export mocks
export { messageMockInboxData } from './infrastructure/mock/message-mock-inbox.data';
export { MessageMockInboxSeeder } from './infrastructure/mock/message-mock-inbox.seeder';
export { MessageMockInboxRepository } from './infrastructure/mock/message-mock-inbox.repository';

// export events
export { MessageAddInboxesContextEvent } from './application/events/message-add-inboxes-context.event';
export { MessageCreatedInboxesEvent } from './application/events/message-created-inboxes.event';
export { MessageCreatedInboxEvent } from './application/events/message-created-inbox.event';
export { MessageDeletedInboxesEvent } from './application/events/message-deleted-inboxes.event';
export { MessageDeletedInboxEvent } from './application/events/message-deleted-inbox.event';
export { MessageUpdatedInboxesEvent } from './application/events/message-updated-inboxes.event';
export { MessageUpdatedInboxEvent } from './application/events/message-updated-inbox.event';
export { MessageUpdatedAndIncrementedInboxesEvent } from './application/events/message-updated-and-incremented-inboxes.event';
export { MessageUpdatedAndIncrementedInboxEvent } from './application/events/message-updated-and-incremented-inbox.event';

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
import { MessageUpdateInboxByIdCommandHandler } from './application/update/message-update-inbox-by-id.command-handler';
import { MessageUpdateInboxesCommandHandler } from './application/update/message-update-inboxes.command-handler';
import { MessageUpdateAndIncrementInboxesCommandHandler } from './application/update/message-update-and-increment-inboxes.command-handler';
import { MessageUpsertInboxCommandHandler } from './application/upsert/message-upsert-inbox.command-handler';
import { MessageDeleteInboxByIdCommandHandler } from './application/delete/message-delete-inbox-by-id.command-handler';
import { MessageDeleteInboxesCommandHandler } from './application/delete/message-delete-inboxes.command-handler';

// query handlers
import { MessagePaginateInboxesQueryHandler } from './application/paginate/message-paginate-inboxes.query-handler';
import { MessageGetInboxesQueryHandler } from './application/get/message-get-inboxes.query-handler';
import { MessageFindInboxQueryHandler } from './application/find/message-find-inbox.query-handler';
import { MessageFindInboxByIdQueryHandler } from './application/find/message-find-inbox-by-id.query-handler';
import { MessageRawSQLInboxesQueryHandler } from './application/raw-sql/message-raw-sql-inboxes.query-handler';
import { MessageCountInboxQueryHandler } from './application/count/message-count-inbox.query-handler';
import { MessageMaxInboxQueryHandler } from './application/max/message-max-inbox.query-handler';
import { MessageMinInboxQueryHandler } from './application/min/message-min-inbox.query-handler';
import { MessageSumInboxQueryHandler } from './application/sum/message-sum-inbox.query-handler';

// event handlers
import { MessageCreatedInboxEventHandler } from './application/events/message-created-inbox.event-handler';
import { MessageCreatedInboxesEventHandler } from './application/events/message-created-inboxes.event-handler';
import { MessageUpdatedInboxEventHandler } from './application/events/message-updated-inbox.event-handler';
import { MessageUpdatedInboxesEventHandler } from './application/events/message-updated-inboxes.event-handler';
import { MessageUpdatedAndIncrementedInboxesEventHandler } from './application/events/message-updated-and-incremented-inboxes.event-handler';
import { MessageDeletedInboxEventHandler } from './application/events/message-deleted-inbox.event-handler';
import { MessageDeletedInboxesEventHandler } from './application/events/message-deleted-inboxes.event-handler';

// services
import { MessageCreateInboxService } from './application/create/message-create-inbox.service';
import { MessageCreateInboxesService } from './application/create/message-create-inboxes.service';
import { MessagePaginateInboxesService } from './application/paginate/message-paginate-inboxes.service';
import { MessageGetInboxesService } from './application/get/message-get-inboxes.service';
import { MessageFindInboxService } from './application/find/message-find-inbox.service';
import { MessageFindInboxByIdService } from './application/find/message-find-inbox-by-id.service';
import { MessageRawSQLInboxesService } from './application/raw-sql/message-raw-sql-inboxes.service';
import { MessageCountInboxService } from './application/count/message-count-inbox.service';
import { MessageMaxInboxService } from './application/max/message-max-inbox.service';
import { MessageMinInboxService } from './application/min/message-min-inbox.service';
import { MessageSumInboxService } from './application/sum/message-sum-inbox.service';
import { MessageUpdateInboxByIdService } from './application/update/message-update-inbox-by-id.service';
import { MessageUpdateInboxesService } from './application/update/message-update-inboxes.service';
import { MessageUpdateAndIncrementInboxesService } from './application/update/message-update-and-increment-inboxes.service';
import { MessageUpsertInboxService } from './application/upsert/message-upsert-inbox.service';
import { MessageDeleteInboxByIdService } from './application/delete/message-delete-inbox-by-id.service';
import { MessageDeleteInboxesService } from './application/delete/message-delete-inboxes.service';

export const MessageInboxHandlers = [
    // commands
    MessageCreateInboxCommandHandler,
    MessageCreateInboxesCommandHandler,
    MessageUpdateInboxByIdCommandHandler,
    MessageUpdateInboxesCommandHandler,
    MessageUpdateAndIncrementInboxesCommandHandler,
    MessageUpsertInboxCommandHandler,
    MessageDeleteInboxByIdCommandHandler,
    MessageDeleteInboxesCommandHandler,

    // queries
    MessagePaginateInboxesQueryHandler,
    MessageGetInboxesQueryHandler,
    MessageFindInboxQueryHandler,
    MessageFindInboxByIdQueryHandler,
    MessageRawSQLInboxesQueryHandler,
    MessageCountInboxQueryHandler,
    MessageMaxInboxQueryHandler,
    MessageMinInboxQueryHandler,
    MessageSumInboxQueryHandler,

    // events
    MessageCreatedInboxEventHandler,
    MessageCreatedInboxesEventHandler,
    MessageUpdatedInboxEventHandler,
    MessageUpdatedInboxesEventHandler,
    MessageUpdatedAndIncrementedInboxesEventHandler,
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
    MessageRawSQLInboxesService,
    MessageCountInboxService,
    MessageMaxInboxService,
    MessageMinInboxService,
    MessageSumInboxService,
    MessageUpdateInboxByIdService,
    MessageUpdateInboxesService,
    MessageUpdateAndIncrementInboxesService,
    MessageUpsertInboxService,
    MessageDeleteInboxByIdService,
    MessageDeleteInboxesService,
];