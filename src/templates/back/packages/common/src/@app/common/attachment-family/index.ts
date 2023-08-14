// export commands
export { CommonCreateAttachmentFamilyCommand } from './application/create/common-create-attachment-family.command';
export { CommonCreateAttachmentFamiliesCommand } from './application/create/common-create-attachment-families.command';
export { CommonUpdateAttachmentFamilyByIdCommand } from './application/update/common-update-attachment-family-by-id.command';
export { CommonUpdateAttachmentFamiliesCommand } from './application/update/common-update-attachment-families.command';
export { CommonUpsertAttachmentFamilyCommand } from './application/upsert/common-upsert-attachment-family.command';
export { CommonDeleteAttachmentFamilyByIdCommand } from './application/delete/common-delete-attachment-family-by-id.command';
export { CommonDeleteAttachmentFamiliesCommand } from './application/delete/common-delete-attachment-families.command';

// export queries
export { CommonPaginateAttachmentFamiliesQuery } from './application/paginate/common-paginate-attachment-families.query';
export { CommonGetAttachmentFamiliesQuery } from './application/get/common-get-attachment-families.query';
export { CommonFindAttachmentFamilyQuery } from './application/find/common-find-attachment-family.query';
export { CommonFindAttachmentFamilyByIdQuery } from './application/find/common-find-attachment-family-by-id.query';
export { CommonRawSQLAttachmentFamiliesQuery } from './application/raw-sql/common-raw-sql-attachment-families.query';

// export mocks
export { commonMockAttachmentFamilyData } from './infrastructure/mock/common-mock-attachment-family.data';
export { CommonMockAttachmentFamilySeeder } from './infrastructure/mock/common-mock-attachment-family.seeder';
export { CommonMockAttachmentFamilyRepository } from './infrastructure/mock/common-mock-attachment-family.repository';

// export events
export { CommonAddAttachmentFamiliesContextEvent } from './application/events/common-add-attachment-families-context.event';
export { CommonCreatedAttachmentFamiliesEvent } from './application/events/common-created-attachment-families.event';
export { CommonCreatedAttachmentFamilyEvent } from './application/events/common-created-attachment-family.event';
export { CommonDeletedAttachmentFamiliesEvent } from './application/events/common-deleted-attachment-families.event';
export { CommonDeletedAttachmentFamilyEvent } from './application/events/common-deleted-attachment-family.event';
export { CommonUpdatedAttachmentFamiliesEvent } from './application/events/common-updated-attachment-families.event';
export { CommonUpdatedAttachmentFamilyEvent } from './application/events/common-updated-attachment-family.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { CommonAttachmentFamily } from './domain/common-attachment-family.aggregate';
export { CommonAttachmentFamilyMapper } from './domain/common-attachment-family.mapper';
export { CommonIAttachmentFamilyRepository } from './domain/common-attachment-family.repository';
export { CommonAttachmentFamilyResponse } from './domain/common-attachment-family.response';

// infrastructure
export { CommonAttachmentFamilyModel } from './infrastructure/sequelize/common-sequelize-attachment-family.model';
export { CommonSequelizeAttachmentFamilyRepository } from './infrastructure/sequelize/common-sequelize-attachment-family.repository';

// sagas
export { CommonAttachmentFamilySagas } from './application/sagas/common-attachment-family.sagas';

// command handlers
import { CommonCreateAttachmentFamilyCommandHandler } from './application/create/common-create-attachment-family.command-handler';
import { CommonCreateAttachmentFamiliesCommandHandler } from './application/create/common-create-attachment-families.command-handler';
import { CommonUpdateAttachmentFamilyByIdCommandHandler } from './application/update/common-update-attachment-family-by-id.command-handler';
import { CommonUpdateAttachmentFamiliesCommandHandler } from './application/update/common-update-attachment-families.command-handler';
import { CommonUpsertAttachmentFamilyCommandHandler } from './application/upsert/common-upsert-attachment-family.command-handler';
import { CommonDeleteAttachmentFamilyByIdCommandHandler } from './application/delete/common-delete-attachment-family-by-id.command-handler';
import { CommonDeleteAttachmentFamiliesCommandHandler } from './application/delete/common-delete-attachment-families.command-handler';

// query handlers
import { CommonPaginateAttachmentFamiliesQueryHandler } from './application/paginate/common-paginate-attachment-families.query-handler';
import { CommonGetAttachmentFamiliesQueryHandler } from './application/get/common-get-attachment-families.query-handler';
import { CommonFindAttachmentFamilyQueryHandler } from './application/find/common-find-attachment-family.query-handler';
import { CommonFindAttachmentFamilyByIdQueryHandler } from './application/find/common-find-attachment-family-by-id.query-handler';
import { CommonRawSQLAttachmentFamiliesQueryHandler } from './application/raw-sql/common-raw-sql-attachment-families.query-handler';

// event handlers
import { CommonCreatedAttachmentFamilyEventHandler } from './application/events/common-created-attachment-family.event-handler';
import { CommonCreatedAttachmentFamiliesEventHandler } from './application/events/common-created-attachment-families.event-handler';
import { CommonUpdatedAttachmentFamilyEventHandler } from './application/events/common-updated-attachment-family.event-handler';
import { CommonUpdatedAttachmentFamiliesEventHandler } from './application/events/common-updated-attachment-families.event-handler';
import { CommonDeletedAttachmentFamilyEventHandler } from './application/events/common-deleted-attachment-family.event-handler';
import { CommonDeletedAttachmentFamiliesEventHandler } from './application/events/common-deleted-attachment-families.event-handler';

// services
import { CommonCreateAttachmentFamilyService } from './application/create/common-create-attachment-family.service';
import { CommonCreateAttachmentFamiliesService } from './application/create/common-create-attachment-families.service';
import { CommonPaginateAttachmentFamiliesService } from './application/paginate/common-paginate-attachment-families.service';
import { CommonGetAttachmentFamiliesService } from './application/get/common-get-attachment-families.service';
import { CommonFindAttachmentFamilyService } from './application/find/common-find-attachment-family.service';
import { CommonFindAttachmentFamilyByIdService } from './application/find/common-find-attachment-family-by-id.service';
import { CommonRawSQLAttachmentFamiliesService } from './application/raw-sql/common-raw-sql-attachment-families.service';
import { CommonUpdateAttachmentFamilyByIdService } from './application/update/common-update-attachment-family-by-id.service';
import { CommonUpdateAttachmentFamiliesService } from './application/update/common-update-attachment-families.service';
import { CommonUpsertAttachmentFamilyService } from './application/upsert/common-upsert-attachment-family.service';
import { CommonDeleteAttachmentFamilyByIdService } from './application/delete/common-delete-attachment-family-by-id.service';
import { CommonDeleteAttachmentFamiliesService } from './application/delete/common-delete-attachment-families.service';

export const CommonAttachmentFamilyHandlers = [
    // commands
    CommonCreateAttachmentFamilyCommandHandler,
    CommonCreateAttachmentFamiliesCommandHandler,
    CommonUpdateAttachmentFamilyByIdCommandHandler,
    CommonUpdateAttachmentFamiliesCommandHandler,
    CommonUpsertAttachmentFamilyCommandHandler,
    CommonDeleteAttachmentFamilyByIdCommandHandler,
    CommonDeleteAttachmentFamiliesCommandHandler,

    // queries
    CommonPaginateAttachmentFamiliesQueryHandler,
    CommonGetAttachmentFamiliesQueryHandler,
    CommonFindAttachmentFamilyQueryHandler,
    CommonFindAttachmentFamilyByIdQueryHandler,
    CommonRawSQLAttachmentFamiliesQueryHandler,

    // events
    CommonCreatedAttachmentFamilyEventHandler,
    CommonCreatedAttachmentFamiliesEventHandler,
    CommonUpdatedAttachmentFamilyEventHandler,
    CommonUpdatedAttachmentFamiliesEventHandler,
    CommonDeletedAttachmentFamilyEventHandler,
    CommonDeletedAttachmentFamiliesEventHandler,
];

export const CommonAttachmentFamilyServices = [
    CommonCreateAttachmentFamilyService,
    CommonCreateAttachmentFamiliesService,
    CommonPaginateAttachmentFamiliesService,
    CommonGetAttachmentFamiliesService,
    CommonFindAttachmentFamilyService,
    CommonFindAttachmentFamilyByIdService,
    CommonRawSQLAttachmentFamiliesService,
    CommonUpdateAttachmentFamilyByIdService,
    CommonUpdateAttachmentFamiliesService,
    CommonUpsertAttachmentFamilyService,
    CommonDeleteAttachmentFamilyByIdService,
    CommonDeleteAttachmentFamiliesService,
];