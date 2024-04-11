// export commands
export { MessageCreateOutboxCommand } from './application/create/message-create-outbox.command';
export { MessageCreateOutboxesCommand } from './application/create/message-create-outboxes.command';
export { MessageUpdateOutboxByIdCommand } from './application/update/message-update-outbox-by-id.command';
export { MessageUpdateOutboxesCommand } from './application/update/message-update-outboxes.command';
export { MessageUpdateAndIncrementOutboxesCommand } from './application/update/message-update-and-increment-outboxes.command';
export { MessageUpsertOutboxCommand } from './application/upsert/message-upsert-outbox.command';
export { MessageDeleteOutboxByIdCommand } from './application/delete/message-delete-outbox-by-id.command';
export { MessageDeleteOutboxesCommand } from './application/delete/message-delete-outboxes.command';

// export queries
export { MessagePaginateOutboxesQuery } from './application/paginate/message-paginate-outboxes.query';
export { MessageGetOutboxesQuery } from './application/get/message-get-outboxes.query';
export { MessageFindOutboxQuery } from './application/find/message-find-outbox.query';
export { MessageFindOutboxByIdQuery } from './application/find/message-find-outbox-by-id.query';
export { MessageRawSQLOutboxesQuery } from './application/raw-sql/message-raw-sql-outboxes.query';
export { MessageCountOutboxQuery } from './application/count/message-count-outbox.query';
export { MessageMaxOutboxQuery } from './application/max/message-max-outbox.query';
export { MessageMinOutboxQuery } from './application/min/message-min-outbox.query';
export { MessageSumOutboxQuery } from './application/sum/message-sum-outbox.query';

// export mocks
export { messageMockOutboxData } from './infrastructure/mock/message-mock-outbox.data';
export { MessageMockOutboxSeeder } from './infrastructure/mock/message-mock-outbox.seeder';
export { MessageMockOutboxRepository } from './infrastructure/mock/message-mock-outbox.repository';

// export events
export { MessageAddOutboxesContextEvent } from './application/events/message-add-outboxes-context.event';
export { MessageCreatedOutboxesEvent } from './application/events/message-created-outboxes.event';
export { MessageCreatedOutboxEvent } from './application/events/message-created-outbox.event';
export { MessageDeletedOutboxesEvent } from './application/events/message-deleted-outboxes.event';
export { MessageDeletedOutboxEvent } from './application/events/message-deleted-outbox.event';
export { MessageUpdatedOutboxesEvent } from './application/events/message-updated-outboxes.event';
export { MessageUpdatedOutboxEvent } from './application/events/message-updated-outbox.event';
export { MessageUpdatedAndIncrementedOutboxesEvent } from './application/events/message-updated-and-incremented-outboxes.event';
export { MessageUpdatedAndIncrementedOutboxEvent } from './application/events/message-updated-and-incremented-outbox.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { MessageOutbox } from './domain/message-outbox.aggregate';
export { MessageOutboxMapper } from './domain/message-outbox.mapper';
export { MessageIOutboxRepository } from './domain/message-outbox.repository';
export { MessageOutboxResponse } from './domain/message-outbox.response';

// infrastructure
export { MessageOutboxModel } from './infrastructure/sequelize/message-sequelize-outbox.model';
export { MessageSequelizeOutboxRepository } from './infrastructure/sequelize/message-sequelize-outbox.repository';

// sagas
export { MessageOutboxSagas } from './application/sagas/message-outbox.sagas';

// command handlers
import { MessageCreateOutboxCommandHandler } from './application/create/message-create-outbox.command-handler';
import { MessageCreateOutboxesCommandHandler } from './application/create/message-create-outboxes.command-handler';
import { MessageUpdateOutboxByIdCommandHandler } from './application/update/message-update-outbox-by-id.command-handler';
import { MessageUpdateOutboxesCommandHandler } from './application/update/message-update-outboxes.command-handler';
import { MessageUpdateAndIncrementOutboxesCommandHandler } from './application/update/message-update-and-increment-outboxes.command-handler';
import { MessageUpsertOutboxCommandHandler } from './application/upsert/message-upsert-outbox.command-handler';
import { MessageDeleteOutboxByIdCommandHandler } from './application/delete/message-delete-outbox-by-id.command-handler';
import { MessageDeleteOutboxesCommandHandler } from './application/delete/message-delete-outboxes.command-handler';

// query handlers
import { MessagePaginateOutboxesQueryHandler } from './application/paginate/message-paginate-outboxes.query-handler';
import { MessageGetOutboxesQueryHandler } from './application/get/message-get-outboxes.query-handler';
import { MessageFindOutboxQueryHandler } from './application/find/message-find-outbox.query-handler';
import { MessageFindOutboxByIdQueryHandler } from './application/find/message-find-outbox-by-id.query-handler';
import { MessageRawSQLOutboxesQueryHandler } from './application/raw-sql/message-raw-sql-outboxes.query-handler';
import { MessageCountOutboxQueryHandler } from './application/count/message-count-outbox.query-handler';
import { MessageMaxOutboxQueryHandler } from './application/max/message-max-outbox.query-handler';
import { MessageMinOutboxQueryHandler } from './application/min/message-min-outbox.query-handler';
import { MessageSumOutboxQueryHandler } from './application/sum/message-sum-outbox.query-handler';

// event handlers
import { MessageCreatedOutboxEventHandler } from './application/events/message-created-outbox.event-handler';
import { MessageCreatedOutboxesEventHandler } from './application/events/message-created-outboxes.event-handler';
import { MessageUpdatedOutboxEventHandler } from './application/events/message-updated-outbox.event-handler';
import { MessageUpdatedOutboxesEventHandler } from './application/events/message-updated-outboxes.event-handler';
import { MessageUpdatedAndIncrementedOutboxesEventHandler } from './application/events/message-updated-and-incremented-outboxes.event-handler';
import { MessageDeletedOutboxEventHandler } from './application/events/message-deleted-outbox.event-handler';
import { MessageDeletedOutboxesEventHandler } from './application/events/message-deleted-outboxes.event-handler';

// services
import { MessageCreateOutboxService } from './application/create/message-create-outbox.service';
import { MessageCreateOutboxesService } from './application/create/message-create-outboxes.service';
import { MessagePaginateOutboxesService } from './application/paginate/message-paginate-outboxes.service';
import { MessageGetOutboxesService } from './application/get/message-get-outboxes.service';
import { MessageFindOutboxService } from './application/find/message-find-outbox.service';
import { MessageFindOutboxByIdService } from './application/find/message-find-outbox-by-id.service';
import { MessageRawSQLOutboxesService } from './application/raw-sql/message-raw-sql-outboxes.service';
import { MessageCountOutboxService } from './application/count/message-count-outbox.service';
import { MessageMaxOutboxService } from './application/max/message-max-outbox.service';
import { MessageMinOutboxService } from './application/min/message-min-outbox.service';
import { MessageSumOutboxService } from './application/sum/message-sum-outbox.service';
import { MessageUpdateOutboxByIdService } from './application/update/message-update-outbox-by-id.service';
import { MessageUpdateOutboxesService } from './application/update/message-update-outboxes.service';
import { MessageUpdateAndIncrementOutboxesService } from './application/update/message-update-and-increment-outboxes.service';
import { MessageUpsertOutboxService } from './application/upsert/message-upsert-outbox.service';
import { MessageDeleteOutboxByIdService } from './application/delete/message-delete-outbox-by-id.service';
import { MessageDeleteOutboxesService } from './application/delete/message-delete-outboxes.service';

export const MessageOutboxHandlers = [
    // commands
    MessageCreateOutboxCommandHandler,
    MessageCreateOutboxesCommandHandler,
    MessageUpdateOutboxByIdCommandHandler,
    MessageUpdateOutboxesCommandHandler,
    MessageUpdateAndIncrementOutboxesCommandHandler,
    MessageUpsertOutboxCommandHandler,
    MessageDeleteOutboxByIdCommandHandler,
    MessageDeleteOutboxesCommandHandler,

    // queries
    MessagePaginateOutboxesQueryHandler,
    MessageGetOutboxesQueryHandler,
    MessageFindOutboxQueryHandler,
    MessageFindOutboxByIdQueryHandler,
    MessageRawSQLOutboxesQueryHandler,
    MessageCountOutboxQueryHandler,
    MessageMaxOutboxQueryHandler,
    MessageMinOutboxQueryHandler,
    MessageSumOutboxQueryHandler,

    // events
    MessageCreatedOutboxEventHandler,
    MessageCreatedOutboxesEventHandler,
    MessageUpdatedOutboxEventHandler,
    MessageUpdatedOutboxesEventHandler,
    MessageUpdatedAndIncrementedOutboxesEventHandler,
    MessageDeletedOutboxEventHandler,
    MessageDeletedOutboxesEventHandler,
];

export const MessageOutboxServices = [
    MessageCreateOutboxService,
    MessageCreateOutboxesService,
    MessagePaginateOutboxesService,
    MessageGetOutboxesService,
    MessageFindOutboxService,
    MessageFindOutboxByIdService,
    MessageRawSQLOutboxesService,
    MessageCountOutboxService,
    MessageMaxOutboxService,
    MessageMinOutboxService,
    MessageSumOutboxService,
    MessageUpdateOutboxByIdService,
    MessageUpdateOutboxesService,
    MessageUpdateAndIncrementOutboxesService,
    MessageUpsertOutboxService,
    MessageDeleteOutboxByIdService,
    MessageDeleteOutboxesService,
];