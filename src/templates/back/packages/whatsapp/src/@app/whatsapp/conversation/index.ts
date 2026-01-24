// export commands
export { WhatsappCreateConversationCommand } from './application/create/whatsapp-create-conversation.command';
export { WhatsappCreateConversationsCommand } from './application/create/whatsapp-create-conversations.command';
export { WhatsappDeleteConversationByIdCommand } from './application/delete/whatsapp-delete-conversation-by-id.command';
export { WhatsappDeleteConversationsCommand } from './application/delete/whatsapp-delete-conversations.command';
export { WhatsappUpdateAndIncrementConversationsCommand } from './application/update/whatsapp-update-and-increment-conversations.command';
export { WhatsappUpdateConversationByIdCommand } from './application/update/whatsapp-update-conversation-by-id.command';
export { WhatsappUpdateConversationsCommand } from './application/update/whatsapp-update-conversations.command';
export { WhatsappUpsertConversationCommand } from './application/upsert/whatsapp-upsert-conversation.command';

// export queries
export { WhatsappCountConversationQuery } from './application/count/whatsapp-count-conversation.query';
export { WhatsappFindConversationByIdQuery } from './application/find/whatsapp-find-conversation-by-id.query';
export { WhatsappFindConversationQuery } from './application/find/whatsapp-find-conversation.query';
export { WhatsappGetConversationsQuery } from './application/get/whatsapp-get-conversations.query';
export { WhatsappMaxConversationQuery } from './application/max/whatsapp-max-conversation.query';
export { WhatsappMinConversationQuery } from './application/min/whatsapp-min-conversation.query';
export { WhatsappPaginateConversationsQuery } from './application/paginate/whatsapp-paginate-conversations.query';
export { WhatsappRawSQLConversationsQuery } from './application/raw-sql/whatsapp-raw-sql-conversations.query';
export { WhatsappSumConversationQuery } from './application/sum/whatsapp-sum-conversation.query';

// export mocks
export { whatsappMockConversationData } from './infrastructure/mock/whatsapp-mock-conversation.data';
export { WhatsappMockConversationRepository } from './infrastructure/mock/whatsapp-mock-conversation.repository';
export { WhatsappMockConversationSeeder } from './infrastructure/mock/whatsapp-mock-conversation.seeder';

// export events
export { WhatsappAddConversationsContextEvent } from './application/events/whatsapp-add-conversations-context.event';
export { WhatsappCreatedConversationEvent } from './application/events/whatsapp-created-conversation.event';
export { WhatsappCreatedConversationsEvent } from './application/events/whatsapp-created-conversations.event';
export { WhatsappDeletedConversationEvent } from './application/events/whatsapp-deleted-conversation.event';
export { WhatsappDeletedConversationsEvent } from './application/events/whatsapp-deleted-conversations.event';
export { WhatsappUpdatedAndIncrementedConversationEvent } from './application/events/whatsapp-updated-and-incremented-conversation.event';
export { WhatsappUpdatedAndIncrementedConversationsEvent } from './application/events/whatsapp-updated-and-incremented-conversations.event';
export { WhatsappUpdatedConversationEvent } from './application/events/whatsapp-updated-conversation.event';
export { WhatsappUpdatedConversationsEvent } from './application/events/whatsapp-updated-conversations.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { WhatsappConversation } from './domain/whatsapp-conversation.aggregate';
export { WhatsappConversationMapper } from './domain/whatsapp-conversation.mapper';
export { WhatsappIConversationRepository } from './domain/whatsapp-conversation.repository';
export { WhatsappConversationResponse } from './domain/whatsapp-conversation.response';

// infrastructure
export { WhatsappConversationModel } from './infrastructure/sequelize/whatsapp-sequelize-conversation.model';
export { WhatsappSequelizeConversationRepository } from './infrastructure/sequelize/whatsapp-sequelize-conversation.repository';

// sagas
export { WhatsappConversationSagas } from './application/sagas/whatsapp-conversation.sagas';

// command handlers
import { WhatsappCreateConversationCommandHandler } from './application/create/whatsapp-create-conversation.command-handler';
import { WhatsappCreateConversationsCommandHandler } from './application/create/whatsapp-create-conversations.command-handler';
import { WhatsappDeleteConversationByIdCommandHandler } from './application/delete/whatsapp-delete-conversation-by-id.command-handler';
import { WhatsappDeleteConversationsCommandHandler } from './application/delete/whatsapp-delete-conversations.command-handler';
import { WhatsappUpdateAndIncrementConversationsCommandHandler } from './application/update/whatsapp-update-and-increment-conversations.command-handler';
import { WhatsappUpdateConversationByIdCommandHandler } from './application/update/whatsapp-update-conversation-by-id.command-handler';
import { WhatsappUpdateConversationsCommandHandler } from './application/update/whatsapp-update-conversations.command-handler';
import { WhatsappUpsertConversationCommandHandler } from './application/upsert/whatsapp-upsert-conversation.command-handler';

// query handlers
import { WhatsappCountConversationQueryHandler } from './application/count/whatsapp-count-conversation.query-handler';
import { WhatsappFindConversationByIdQueryHandler } from './application/find/whatsapp-find-conversation-by-id.query-handler';
import { WhatsappFindConversationQueryHandler } from './application/find/whatsapp-find-conversation.query-handler';
import { WhatsappGetConversationsQueryHandler } from './application/get/whatsapp-get-conversations.query-handler';
import { WhatsappMaxConversationQueryHandler } from './application/max/whatsapp-max-conversation.query-handler';
import { WhatsappMinConversationQueryHandler } from './application/min/whatsapp-min-conversation.query-handler';
import { WhatsappPaginateConversationsQueryHandler } from './application/paginate/whatsapp-paginate-conversations.query-handler';
import { WhatsappRawSQLConversationsQueryHandler } from './application/raw-sql/whatsapp-raw-sql-conversations.query-handler';
import { WhatsappSumConversationQueryHandler } from './application/sum/whatsapp-sum-conversation.query-handler';

// event handlers
import { WhatsappCreatedConversationEventHandler } from './application/events/whatsapp-created-conversation.event-handler';
import { WhatsappCreatedConversationsEventHandler } from './application/events/whatsapp-created-conversations.event-handler';
import { WhatsappDeletedConversationEventHandler } from './application/events/whatsapp-deleted-conversation.event-handler';
import { WhatsappDeletedConversationsEventHandler } from './application/events/whatsapp-deleted-conversations.event-handler';
import { WhatsappUpdatedAndIncrementedConversationsEventHandler } from './application/events/whatsapp-updated-and-incremented-conversations.event-handler';
import { WhatsappUpdatedConversationEventHandler } from './application/events/whatsapp-updated-conversation.event-handler';
import { WhatsappUpdatedConversationsEventHandler } from './application/events/whatsapp-updated-conversations.event-handler';

// services
import { WhatsappCountConversationService } from './application/count/whatsapp-count-conversation.service';
import { WhatsappCreateConversationService } from './application/create/whatsapp-create-conversation.service';
import { WhatsappCreateConversationsService } from './application/create/whatsapp-create-conversations.service';
import { WhatsappDeleteConversationByIdService } from './application/delete/whatsapp-delete-conversation-by-id.service';
import { WhatsappDeleteConversationsService } from './application/delete/whatsapp-delete-conversations.service';
import { WhatsappFindConversationByIdService } from './application/find/whatsapp-find-conversation-by-id.service';
import { WhatsappFindConversationService } from './application/find/whatsapp-find-conversation.service';
import { WhatsappGetConversationsService } from './application/get/whatsapp-get-conversations.service';
import { WhatsappMaxConversationService } from './application/max/whatsapp-max-conversation.service';
import { WhatsappMinConversationService } from './application/min/whatsapp-min-conversation.service';
import { WhatsappPaginateConversationsService } from './application/paginate/whatsapp-paginate-conversations.service';
import { WhatsappRawSQLConversationsService } from './application/raw-sql/whatsapp-raw-sql-conversations.service';
import { WhatsappSumConversationService } from './application/sum/whatsapp-sum-conversation.service';
import { WhatsappUpdateAndIncrementConversationsService } from './application/update/whatsapp-update-and-increment-conversations.service';
import { WhatsappUpdateConversationByIdService } from './application/update/whatsapp-update-conversation-by-id.service';
import { WhatsappUpdateConversationsService } from './application/update/whatsapp-update-conversations.service';
import { WhatsappUpsertConversationService } from './application/upsert/whatsapp-upsert-conversation.service';

export const WhatsappConversationHandlers = [
  // commands
  WhatsappCreateConversationCommandHandler,
  WhatsappCreateConversationsCommandHandler,
  WhatsappUpdateConversationByIdCommandHandler,
  WhatsappUpdateConversationsCommandHandler,
  WhatsappUpdateAndIncrementConversationsCommandHandler,
  WhatsappUpsertConversationCommandHandler,
  WhatsappDeleteConversationByIdCommandHandler,
  WhatsappDeleteConversationsCommandHandler,

  // queries
  WhatsappPaginateConversationsQueryHandler,
  WhatsappGetConversationsQueryHandler,
  WhatsappFindConversationQueryHandler,
  WhatsappFindConversationByIdQueryHandler,
  WhatsappRawSQLConversationsQueryHandler,
  WhatsappCountConversationQueryHandler,
  WhatsappMaxConversationQueryHandler,
  WhatsappMinConversationQueryHandler,
  WhatsappSumConversationQueryHandler,

  // events
  WhatsappCreatedConversationEventHandler,
  WhatsappCreatedConversationsEventHandler,
  WhatsappUpdatedConversationEventHandler,
  WhatsappUpdatedConversationsEventHandler,
  WhatsappUpdatedAndIncrementedConversationsEventHandler,
  WhatsappDeletedConversationEventHandler,
  WhatsappDeletedConversationsEventHandler,
];

export const WhatsappConversationServices = [
  WhatsappCreateConversationService,
  WhatsappCreateConversationsService,
  WhatsappPaginateConversationsService,
  WhatsappGetConversationsService,
  WhatsappFindConversationService,
  WhatsappFindConversationByIdService,
  WhatsappRawSQLConversationsService,
  WhatsappCountConversationService,
  WhatsappMaxConversationService,
  WhatsappMinConversationService,
  WhatsappSumConversationService,
  WhatsappUpdateConversationByIdService,
  WhatsappUpdateConversationsService,
  WhatsappUpdateAndIncrementConversationsService,
  WhatsappUpsertConversationService,
  WhatsappDeleteConversationByIdService,
  WhatsappDeleteConversationsService,
];
