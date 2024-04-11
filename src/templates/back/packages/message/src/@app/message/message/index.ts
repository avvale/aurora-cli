// export commands
export { MessageCreateMessageCommand } from './application/create/message-create-message.command';
export { MessageCreateMessagesCommand } from './application/create/message-create-messages.command';
export { MessageUpdateMessageByIdCommand } from './application/update/message-update-message-by-id.command';
export { MessageUpdateMessagesCommand } from './application/update/message-update-messages.command';
export { MessageUpdateAndIncrementMessagesCommand } from './application/update/message-update-and-increment-messages.command';
export { MessageUpsertMessageCommand } from './application/upsert/message-upsert-message.command';
export { MessageDeleteMessageByIdCommand } from './application/delete/message-delete-message-by-id.command';
export { MessageDeleteMessagesCommand } from './application/delete/message-delete-messages.command';

// export queries
export { MessagePaginateMessagesQuery } from './application/paginate/message-paginate-messages.query';
export { MessageGetMessagesQuery } from './application/get/message-get-messages.query';
export { MessageFindMessageQuery } from './application/find/message-find-message.query';
export { MessageFindMessageByIdQuery } from './application/find/message-find-message-by-id.query';
export { MessageRawSQLMessagesQuery } from './application/raw-sql/message-raw-sql-messages.query';
export { MessageCountMessageQuery } from './application/count/message-count-message.query';
export { MessageMaxMessageQuery } from './application/max/message-max-message.query';
export { MessageMinMessageQuery } from './application/min/message-min-message.query';
export { MessageSumMessageQuery } from './application/sum/message-sum-message.query';

// export mocks
export { messageMockMessageData } from './infrastructure/mock/message-mock-message.data';
export { MessageMockMessageSeeder } from './infrastructure/mock/message-mock-message.seeder';
export { MessageMockMessageRepository } from './infrastructure/mock/message-mock-message.repository';

// export events
export { MessageAddMessagesContextEvent } from './application/events/message-add-messages-context.event';
export { MessageCreatedMessagesEvent } from './application/events/message-created-messages.event';
export { MessageCreatedMessageEvent } from './application/events/message-created-message.event';
export { MessageDeletedMessagesEvent } from './application/events/message-deleted-messages.event';
export { MessageDeletedMessageEvent } from './application/events/message-deleted-message.event';
export { MessageUpdatedMessagesEvent } from './application/events/message-updated-messages.event';
export { MessageUpdatedMessageEvent } from './application/events/message-updated-message.event';
export { MessageUpdatedAndIncrementedMessagesEvent } from './application/events/message-updated-and-incremented-messages.event';
export { MessageUpdatedAndIncrementedMessageEvent } from './application/events/message-updated-and-incremented-message.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { MessageMessage } from './domain/message-message.aggregate';
export { MessageMessageMapper } from './domain/message-message.mapper';
export { MessageIMessageRepository } from './domain/message-message.repository';
export { MessageMessageResponse } from './domain/message-message.response';

// infrastructure
export { MessageMessageModel } from './infrastructure/sequelize/message-sequelize-message.model';
export { MessageSequelizeMessageRepository } from './infrastructure/sequelize/message-sequelize-message.repository';

// sagas
export { MessageMessageSagas } from './application/sagas/message-message.sagas';

// command handlers
import { MessageCreateMessageCommandHandler } from './application/create/message-create-message.command-handler';
import { MessageCreateMessagesCommandHandler } from './application/create/message-create-messages.command-handler';
import { MessageUpdateMessageByIdCommandHandler } from './application/update/message-update-message-by-id.command-handler';
import { MessageUpdateMessagesCommandHandler } from './application/update/message-update-messages.command-handler';
import { MessageUpdateAndIncrementMessagesCommandHandler } from './application/update/message-update-and-increment-messages.command-handler';
import { MessageUpsertMessageCommandHandler } from './application/upsert/message-upsert-message.command-handler';
import { MessageDeleteMessageByIdCommandHandler } from './application/delete/message-delete-message-by-id.command-handler';
import { MessageDeleteMessagesCommandHandler } from './application/delete/message-delete-messages.command-handler';

// query handlers
import { MessagePaginateMessagesQueryHandler } from './application/paginate/message-paginate-messages.query-handler';
import { MessageGetMessagesQueryHandler } from './application/get/message-get-messages.query-handler';
import { MessageFindMessageQueryHandler } from './application/find/message-find-message.query-handler';
import { MessageFindMessageByIdQueryHandler } from './application/find/message-find-message-by-id.query-handler';
import { MessageRawSQLMessagesQueryHandler } from './application/raw-sql/message-raw-sql-messages.query-handler';
import { MessageCountMessageQueryHandler } from './application/count/message-count-message.query-handler';
import { MessageMaxMessageQueryHandler } from './application/max/message-max-message.query-handler';
import { MessageMinMessageQueryHandler } from './application/min/message-min-message.query-handler';
import { MessageSumMessageQueryHandler } from './application/sum/message-sum-message.query-handler';

// event handlers
import { MessageCreatedMessageEventHandler } from './application/events/message-created-message.event-handler';
import { MessageCreatedMessagesEventHandler } from './application/events/message-created-messages.event-handler';
import { MessageUpdatedMessageEventHandler } from './application/events/message-updated-message.event-handler';
import { MessageUpdatedMessagesEventHandler } from './application/events/message-updated-messages.event-handler';
import { MessageUpdatedAndIncrementedMessagesEventHandler } from './application/events/message-updated-and-incremented-messages.event-handler';
import { MessageDeletedMessageEventHandler } from './application/events/message-deleted-message.event-handler';
import { MessageDeletedMessagesEventHandler } from './application/events/message-deleted-messages.event-handler';

// services
import { MessageCreateMessageService } from './application/create/message-create-message.service';
import { MessageCreateMessagesService } from './application/create/message-create-messages.service';
import { MessagePaginateMessagesService } from './application/paginate/message-paginate-messages.service';
import { MessageGetMessagesService } from './application/get/message-get-messages.service';
import { MessageFindMessageService } from './application/find/message-find-message.service';
import { MessageFindMessageByIdService } from './application/find/message-find-message-by-id.service';
import { MessageRawSQLMessagesService } from './application/raw-sql/message-raw-sql-messages.service';
import { MessageCountMessageService } from './application/count/message-count-message.service';
import { MessageMaxMessageService } from './application/max/message-max-message.service';
import { MessageMinMessageService } from './application/min/message-min-message.service';
import { MessageSumMessageService } from './application/sum/message-sum-message.service';
import { MessageUpdateMessageByIdService } from './application/update/message-update-message-by-id.service';
import { MessageUpdateMessagesService } from './application/update/message-update-messages.service';
import { MessageUpdateAndIncrementMessagesService } from './application/update/message-update-and-increment-messages.service';
import { MessageUpsertMessageService } from './application/upsert/message-upsert-message.service';
import { MessageDeleteMessageByIdService } from './application/delete/message-delete-message-by-id.service';
import { MessageDeleteMessagesService } from './application/delete/message-delete-messages.service';

export const MessageMessageHandlers = [
    // commands
    MessageCreateMessageCommandHandler,
    MessageCreateMessagesCommandHandler,
    MessageUpdateMessageByIdCommandHandler,
    MessageUpdateMessagesCommandHandler,
    MessageUpdateAndIncrementMessagesCommandHandler,
    MessageUpsertMessageCommandHandler,
    MessageDeleteMessageByIdCommandHandler,
    MessageDeleteMessagesCommandHandler,

    // queries
    MessagePaginateMessagesQueryHandler,
    MessageGetMessagesQueryHandler,
    MessageFindMessageQueryHandler,
    MessageFindMessageByIdQueryHandler,
    MessageRawSQLMessagesQueryHandler,
    MessageCountMessageQueryHandler,
    MessageMaxMessageQueryHandler,
    MessageMinMessageQueryHandler,
    MessageSumMessageQueryHandler,

    // events
    MessageCreatedMessageEventHandler,
    MessageCreatedMessagesEventHandler,
    MessageUpdatedMessageEventHandler,
    MessageUpdatedMessagesEventHandler,
    MessageUpdatedAndIncrementedMessagesEventHandler,
    MessageDeletedMessageEventHandler,
    MessageDeletedMessagesEventHandler,
];

export const MessageMessageServices = [
    MessageCreateMessageService,
    MessageCreateMessagesService,
    MessagePaginateMessagesService,
    MessageGetMessagesService,
    MessageFindMessageService,
    MessageFindMessageByIdService,
    MessageRawSQLMessagesService,
    MessageCountMessageService,
    MessageMaxMessageService,
    MessageMinMessageService,
    MessageSumMessageService,
    MessageUpdateMessageByIdService,
    MessageUpdateMessagesService,
    MessageUpdateAndIncrementMessagesService,
    MessageUpsertMessageService,
    MessageDeleteMessageByIdService,
    MessageDeleteMessagesService,
];