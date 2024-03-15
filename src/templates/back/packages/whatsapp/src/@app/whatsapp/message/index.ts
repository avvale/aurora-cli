// export commands
export { WhatsappCreateMessageCommand } from './application/create/whatsapp-create-message.command';
export { WhatsappCreateMessagesCommand } from './application/create/whatsapp-create-messages.command';
export { WhatsappUpdateMessageByIdCommand } from './application/update/whatsapp-update-message-by-id.command';
export { WhatsappUpdateMessagesCommand } from './application/update/whatsapp-update-messages.command';
export { WhatsappUpdateAndIncrementMessagesCommand } from './application/update/whatsapp-update-and-increment-messages.command';
export { WhatsappUpsertMessageCommand } from './application/upsert/whatsapp-upsert-message.command';
export { WhatsappDeleteMessageByIdCommand } from './application/delete/whatsapp-delete-message-by-id.command';
export { WhatsappDeleteMessagesCommand } from './application/delete/whatsapp-delete-messages.command';

// export queries
export { WhatsappPaginateMessagesQuery } from './application/paginate/whatsapp-paginate-messages.query';
export { WhatsappGetMessagesQuery } from './application/get/whatsapp-get-messages.query';
export { WhatsappFindMessageQuery } from './application/find/whatsapp-find-message.query';
export { WhatsappFindMessageByIdQuery } from './application/find/whatsapp-find-message-by-id.query';
export { WhatsappRawSQLMessagesQuery } from './application/raw-sql/whatsapp-raw-sql-messages.query';
export { WhatsappCountMessageQuery } from './application/count/whatsapp-count-message.query';
export { WhatsappMaxMessageQuery } from './application/max/whatsapp-max-message.query';
export { WhatsappMinMessageQuery } from './application/min/whatsapp-min-message.query';
export { WhatsappSumMessageQuery } from './application/sum/whatsapp-sum-message.query';

// export mocks
export { whatsappMockMessageData } from './infrastructure/mock/whatsapp-mock-message.data';
export { WhatsappMockMessageSeeder } from './infrastructure/mock/whatsapp-mock-message.seeder';
export { WhatsappMockMessageRepository } from './infrastructure/mock/whatsapp-mock-message.repository';

// export events
export { WhatsappAddMessagesContextEvent } from './application/events/whatsapp-add-messages-context.event';
export { WhatsappCreatedMessagesEvent } from './application/events/whatsapp-created-messages.event';
export { WhatsappCreatedMessageEvent } from './application/events/whatsapp-created-message.event';
export { WhatsappDeletedMessagesEvent } from './application/events/whatsapp-deleted-messages.event';
export { WhatsappDeletedMessageEvent } from './application/events/whatsapp-deleted-message.event';
export { WhatsappUpdatedMessagesEvent } from './application/events/whatsapp-updated-messages.event';
export { WhatsappUpdatedMessageEvent } from './application/events/whatsapp-updated-message.event';
export { WhatsappUpdatedAndIncrementedMessagesEvent } from './application/events/whatsapp-updated-and-incremented-messages.event';
export { WhatsappUpdatedAndIncrementedMessageEvent } from './application/events/whatsapp-updated-and-incremented-message.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { WhatsappMessage } from './domain/whatsapp-message.aggregate';
export { WhatsappMessageMapper } from './domain/whatsapp-message.mapper';
export { WhatsappIMessageRepository } from './domain/whatsapp-message.repository';
export { WhatsappMessageResponse } from './domain/whatsapp-message.response';

// infrastructure
export { WhatsappMessageModel } from './infrastructure/sequelize/whatsapp-sequelize-message.model';
export { WhatsappSequelizeMessageRepository } from './infrastructure/sequelize/whatsapp-sequelize-message.repository';

// sagas
export { WhatsappMessageSagas } from './application/sagas/whatsapp-message.sagas';

// command handlers
import { WhatsappCreateMessageCommandHandler } from './application/create/whatsapp-create-message.command-handler';
import { WhatsappCreateMessagesCommandHandler } from './application/create/whatsapp-create-messages.command-handler';
import { WhatsappUpdateMessageByIdCommandHandler } from './application/update/whatsapp-update-message-by-id.command-handler';
import { WhatsappUpdateMessagesCommandHandler } from './application/update/whatsapp-update-messages.command-handler';
import { WhatsappUpdateAndIncrementMessagesCommandHandler } from './application/update/whatsapp-update-and-increment-messages.command-handler';
import { WhatsappUpsertMessageCommandHandler } from './application/upsert/whatsapp-upsert-message.command-handler';
import { WhatsappDeleteMessageByIdCommandHandler } from './application/delete/whatsapp-delete-message-by-id.command-handler';
import { WhatsappDeleteMessagesCommandHandler } from './application/delete/whatsapp-delete-messages.command-handler';

// query handlers
import { WhatsappPaginateMessagesQueryHandler } from './application/paginate/whatsapp-paginate-messages.query-handler';
import { WhatsappGetMessagesQueryHandler } from './application/get/whatsapp-get-messages.query-handler';
import { WhatsappFindMessageQueryHandler } from './application/find/whatsapp-find-message.query-handler';
import { WhatsappFindMessageByIdQueryHandler } from './application/find/whatsapp-find-message-by-id.query-handler';
import { WhatsappRawSQLMessagesQueryHandler } from './application/raw-sql/whatsapp-raw-sql-messages.query-handler';
import { WhatsappCountMessageQueryHandler } from './application/count/whatsapp-count-message.query-handler';
import { WhatsappMaxMessageQueryHandler } from './application/max/whatsapp-max-message.query-handler';
import { WhatsappMinMessageQueryHandler } from './application/min/whatsapp-min-message.query-handler';
import { WhatsappSumMessageQueryHandler } from './application/sum/whatsapp-sum-message.query-handler';

// event handlers
import { WhatsappCreatedMessageEventHandler } from './application/events/whatsapp-created-message.event-handler';
import { WhatsappCreatedMessagesEventHandler } from './application/events/whatsapp-created-messages.event-handler';
import { WhatsappUpdatedMessageEventHandler } from './application/events/whatsapp-updated-message.event-handler';
import { WhatsappUpdatedMessagesEventHandler } from './application/events/whatsapp-updated-messages.event-handler';
import { WhatsappUpdatedAndIncrementedMessagesEventHandler } from './application/events/whatsapp-updated-and-incremented-messages.event-handler';
import { WhatsappDeletedMessageEventHandler } from './application/events/whatsapp-deleted-message.event-handler';
import { WhatsappDeletedMessagesEventHandler } from './application/events/whatsapp-deleted-messages.event-handler';

// services
import { WhatsappCreateMessageService } from './application/create/whatsapp-create-message.service';
import { WhatsappCreateMessagesService } from './application/create/whatsapp-create-messages.service';
import { WhatsappPaginateMessagesService } from './application/paginate/whatsapp-paginate-messages.service';
import { WhatsappGetMessagesService } from './application/get/whatsapp-get-messages.service';
import { WhatsappFindMessageService } from './application/find/whatsapp-find-message.service';
import { WhatsappFindMessageByIdService } from './application/find/whatsapp-find-message-by-id.service';
import { WhatsappRawSQLMessagesService } from './application/raw-sql/whatsapp-raw-sql-messages.service';
import { WhatsappCountMessageService } from './application/count/whatsapp-count-message.service';
import { WhatsappMaxMessageService } from './application/max/whatsapp-max-message.service';
import { WhatsappMinMessageService } from './application/min/whatsapp-min-message.service';
import { WhatsappSumMessageService } from './application/sum/whatsapp-sum-message.service';
import { WhatsappUpdateMessageByIdService } from './application/update/whatsapp-update-message-by-id.service';
import { WhatsappUpdateMessagesService } from './application/update/whatsapp-update-messages.service';
import { WhatsappUpdateAndIncrementMessagesService } from './application/update/whatsapp-update-and-increment-messages.service';
import { WhatsappUpsertMessageService } from './application/upsert/whatsapp-upsert-message.service';
import { WhatsappDeleteMessageByIdService } from './application/delete/whatsapp-delete-message-by-id.service';
import { WhatsappDeleteMessagesService } from './application/delete/whatsapp-delete-messages.service';

export const WhatsappMessageHandlers = [
    // commands
    WhatsappCreateMessageCommandHandler,
    WhatsappCreateMessagesCommandHandler,
    WhatsappUpdateMessageByIdCommandHandler,
    WhatsappUpdateMessagesCommandHandler,
    WhatsappUpdateAndIncrementMessagesCommandHandler,
    WhatsappUpsertMessageCommandHandler,
    WhatsappDeleteMessageByIdCommandHandler,
    WhatsappDeleteMessagesCommandHandler,

    // queries
    WhatsappPaginateMessagesQueryHandler,
    WhatsappGetMessagesQueryHandler,
    WhatsappFindMessageQueryHandler,
    WhatsappFindMessageByIdQueryHandler,
    WhatsappRawSQLMessagesQueryHandler,
    WhatsappCountMessageQueryHandler,
    WhatsappMaxMessageQueryHandler,
    WhatsappMinMessageQueryHandler,
    WhatsappSumMessageQueryHandler,

    // events
    WhatsappCreatedMessageEventHandler,
    WhatsappCreatedMessagesEventHandler,
    WhatsappUpdatedMessageEventHandler,
    WhatsappUpdatedMessagesEventHandler,
    WhatsappUpdatedAndIncrementedMessagesEventHandler,
    WhatsappDeletedMessageEventHandler,
    WhatsappDeletedMessagesEventHandler,
];

export const WhatsappMessageServices = [
    WhatsappCreateMessageService,
    WhatsappCreateMessagesService,
    WhatsappPaginateMessagesService,
    WhatsappGetMessagesService,
    WhatsappFindMessageService,
    WhatsappFindMessageByIdService,
    WhatsappRawSQLMessagesService,
    WhatsappCountMessageService,
    WhatsappMaxMessageService,
    WhatsappMinMessageService,
    WhatsappSumMessageService,
    WhatsappUpdateMessageByIdService,
    WhatsappUpdateMessagesService,
    WhatsappUpdateAndIncrementMessagesService,
    WhatsappUpsertMessageService,
    WhatsappDeleteMessageByIdService,
    WhatsappDeleteMessagesService,
];