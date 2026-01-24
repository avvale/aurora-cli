// export commands
export { CommonCreateAttachmentCommand } from './application/create/common-create-attachment.command';
export { CommonCreateAttachmentsCommand } from './application/create/common-create-attachments.command';
export { CommonDeleteAttachmentByIdCommand } from './application/delete/common-delete-attachment-by-id.command';
export { CommonDeleteAttachmentsCommand } from './application/delete/common-delete-attachments.command';
export { CommonUpdateAttachmentByIdCommand } from './application/update/common-update-attachment-by-id.command';
export { CommonUpdateAttachmentsCommand } from './application/update/common-update-attachments.command';
export { CommonUpsertAttachmentCommand } from './application/upsert/common-upsert-attachment.command';

// export queries
export { CommonFindAttachmentByIdQuery } from './application/find/common-find-attachment-by-id.query';
export { CommonFindAttachmentQuery } from './application/find/common-find-attachment.query';
export { CommonGetAttachmentsQuery } from './application/get/common-get-attachments.query';
export { CommonPaginateAttachmentsQuery } from './application/paginate/common-paginate-attachments.query';
export { CommonRawSQLAttachmentsQuery } from './application/raw-sql/common-raw-sql-attachments.query';

// export mocks
export { commonMockAttachmentData } from './infrastructure/mock/common-mock-attachment.data';
export { CommonMockAttachmentRepository } from './infrastructure/mock/common-mock-attachment.repository';
export { CommonMockAttachmentSeeder } from './infrastructure/mock/common-mock-attachment.seeder';

// export events
export { CommonAddAttachmentsContextEvent } from './application/events/common-add-attachments-context.event';
export { CommonCreatedAttachmentEvent } from './application/events/common-created-attachment.event';
export { CommonCreatedAttachmentsEvent } from './application/events/common-created-attachments.event';
export { CommonDeletedAttachmentEvent } from './application/events/common-deleted-attachment.event';
export { CommonDeletedAttachmentsEvent } from './application/events/common-deleted-attachments.event';
export { CommonUpdatedAttachmentEvent } from './application/events/common-updated-attachment.event';
export { CommonUpdatedAttachmentsEvent } from './application/events/common-updated-attachments.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { CommonAttachment } from './domain/common-attachment.aggregate';
export { CommonAttachmentMapper } from './domain/common-attachment.mapper';
export { CommonIAttachmentRepository } from './domain/common-attachment.repository';
export { CommonAttachmentResponse } from './domain/common-attachment.response';

// infrastructure
export { CommonAttachmentModel } from './infrastructure/sequelize/common-sequelize-attachment.model';
export { CommonSequelizeAttachmentRepository } from './infrastructure/sequelize/common-sequelize-attachment.repository';

// sagas
export { CommonAttachmentSagas } from './application/sagas/common-attachment.sagas';

// command handlers
import { CommonCreateAttachmentCommandHandler } from './application/create/common-create-attachment.command-handler';
import { CommonCreateAttachmentsCommandHandler } from './application/create/common-create-attachments.command-handler';
import { CommonDeleteAttachmentByIdCommandHandler } from './application/delete/common-delete-attachment-by-id.command-handler';
import { CommonDeleteAttachmentsCommandHandler } from './application/delete/common-delete-attachments.command-handler';
import { CommonUpdateAttachmentByIdCommandHandler } from './application/update/common-update-attachment-by-id.command-handler';
import { CommonUpdateAttachmentsCommandHandler } from './application/update/common-update-attachments.command-handler';
import { CommonUpsertAttachmentCommandHandler } from './application/upsert/common-upsert-attachment.command-handler';

// query handlers
import { CommonFindAttachmentByIdQueryHandler } from './application/find/common-find-attachment-by-id.query-handler';
import { CommonFindAttachmentQueryHandler } from './application/find/common-find-attachment.query-handler';
import { CommonGetAttachmentsQueryHandler } from './application/get/common-get-attachments.query-handler';
import { CommonPaginateAttachmentsQueryHandler } from './application/paginate/common-paginate-attachments.query-handler';
import { CommonRawSQLAttachmentsQueryHandler } from './application/raw-sql/common-raw-sql-attachments.query-handler';

// event handlers
import { CommonCreatedAttachmentEventHandler } from './application/events/common-created-attachment.event-handler';
import { CommonCreatedAttachmentsEventHandler } from './application/events/common-created-attachments.event-handler';
import { CommonDeletedAttachmentEventHandler } from './application/events/common-deleted-attachment.event-handler';
import { CommonDeletedAttachmentsEventHandler } from './application/events/common-deleted-attachments.event-handler';
import { CommonUpdatedAttachmentEventHandler } from './application/events/common-updated-attachment.event-handler';
import { CommonUpdatedAttachmentsEventHandler } from './application/events/common-updated-attachments.event-handler';

// services
import { CommonCreateAttachmentService } from './application/create/common-create-attachment.service';
import { CommonCreateAttachmentsService } from './application/create/common-create-attachments.service';
import { CommonDeleteAttachmentByIdService } from './application/delete/common-delete-attachment-by-id.service';
import { CommonDeleteAttachmentsService } from './application/delete/common-delete-attachments.service';
import { CommonFindAttachmentByIdService } from './application/find/common-find-attachment-by-id.service';
import { CommonFindAttachmentService } from './application/find/common-find-attachment.service';
import { CommonGetAttachmentsService } from './application/get/common-get-attachments.service';
import { CommonPaginateAttachmentsService } from './application/paginate/common-paginate-attachments.service';
import { CommonRawSQLAttachmentsService } from './application/raw-sql/common-raw-sql-attachments.service';
import { CommonUpdateAttachmentByIdService } from './application/update/common-update-attachment-by-id.service';
import { CommonUpdateAttachmentsService } from './application/update/common-update-attachments.service';
import { CommonUpsertAttachmentService } from './application/upsert/common-upsert-attachment.service';

export const CommonAttachmentHandlers = [
  // commands
  CommonCreateAttachmentCommandHandler,
  CommonCreateAttachmentsCommandHandler,
  CommonUpdateAttachmentByIdCommandHandler,
  CommonUpdateAttachmentsCommandHandler,
  CommonUpsertAttachmentCommandHandler,
  CommonDeleteAttachmentByIdCommandHandler,
  CommonDeleteAttachmentsCommandHandler,

  // queries
  CommonPaginateAttachmentsQueryHandler,
  CommonGetAttachmentsQueryHandler,
  CommonFindAttachmentQueryHandler,
  CommonFindAttachmentByIdQueryHandler,
  CommonRawSQLAttachmentsQueryHandler,

  // events
  CommonCreatedAttachmentEventHandler,
  CommonCreatedAttachmentsEventHandler,
  CommonUpdatedAttachmentEventHandler,
  CommonUpdatedAttachmentsEventHandler,
  CommonDeletedAttachmentEventHandler,
  CommonDeletedAttachmentsEventHandler,
];

export const CommonAttachmentServices = [
  CommonCreateAttachmentService,
  CommonCreateAttachmentsService,
  CommonPaginateAttachmentsService,
  CommonGetAttachmentsService,
  CommonFindAttachmentService,
  CommonFindAttachmentByIdService,
  CommonRawSQLAttachmentsService,
  CommonUpdateAttachmentByIdService,
  CommonUpdateAttachmentsService,
  CommonUpsertAttachmentService,
  CommonDeleteAttachmentByIdService,
  CommonDeleteAttachmentsService,
];
