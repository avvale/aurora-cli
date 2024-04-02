// export commands
export { IamCreateTagCommand } from './application/create/iam-create-tag.command';
export { IamCreateTagsCommand } from './application/create/iam-create-tags.command';
export { IamUpdateTagByIdCommand } from './application/update/iam-update-tag-by-id.command';
export { IamUpdateTagsCommand } from './application/update/iam-update-tags.command';
export { IamUpdateAndIncrementTagsCommand } from './application/update/iam-update-and-increment-tags.command';
export { IamUpsertTagCommand } from './application/upsert/iam-upsert-tag.command';
export { IamDeleteTagByIdCommand } from './application/delete/iam-delete-tag-by-id.command';
export { IamDeleteTagsCommand } from './application/delete/iam-delete-tags.command';

// export queries
export { IamPaginateTagsQuery } from './application/paginate/iam-paginate-tags.query';
export { IamGetTagsQuery } from './application/get/iam-get-tags.query';
export { IamFindTagQuery } from './application/find/iam-find-tag.query';
export { IamFindTagByIdQuery } from './application/find/iam-find-tag-by-id.query';
export { IamRawSQLTagsQuery } from './application/raw-sql/iam-raw-sql-tags.query';
export { IamCountTagQuery } from './application/count/iam-count-tag.query';
export { IamMaxTagQuery } from './application/max/iam-max-tag.query';
export { IamMinTagQuery } from './application/min/iam-min-tag.query';
export { IamSumTagQuery } from './application/sum/iam-sum-tag.query';

// export mocks
export { iamMockTagData } from './infrastructure/mock/iam-mock-tag.data';
export { IamMockTagSeeder } from './infrastructure/mock/iam-mock-tag.seeder';
export { IamMockTagRepository } from './infrastructure/mock/iam-mock-tag.repository';

// export events
export { IamAddTagsContextEvent } from './application/events/iam-add-tags-context.event';
export { IamCreatedTagsEvent } from './application/events/iam-created-tags.event';
export { IamCreatedTagEvent } from './application/events/iam-created-tag.event';
export { IamDeletedTagsEvent } from './application/events/iam-deleted-tags.event';
export { IamDeletedTagEvent } from './application/events/iam-deleted-tag.event';
export { IamUpdatedTagsEvent } from './application/events/iam-updated-tags.event';
export { IamUpdatedTagEvent } from './application/events/iam-updated-tag.event';
export { IamUpdatedAndIncrementedTagsEvent } from './application/events/iam-updated-and-incremented-tags.event';
export { IamUpdatedAndIncrementedTagEvent } from './application/events/iam-updated-and-incremented-tag.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamTag } from './domain/iam-tag.aggregate';
export { IamTagMapper } from './domain/iam-tag.mapper';
export { IamITagRepository } from './domain/iam-tag.repository';
export { IamTagResponse } from './domain/iam-tag.response';

// infrastructure
export { IamTagModel } from './infrastructure/sequelize/iam-sequelize-tag.model';
export { IamSequelizeTagRepository } from './infrastructure/sequelize/iam-sequelize-tag.repository';

// sagas
export { IamTagSagas } from './application/sagas/iam-tag.sagas';

// command handlers
import { IamCreateTagCommandHandler } from './application/create/iam-create-tag.command-handler';
import { IamCreateTagsCommandHandler } from './application/create/iam-create-tags.command-handler';
import { IamUpdateTagByIdCommandHandler } from './application/update/iam-update-tag-by-id.command-handler';
import { IamUpdateTagsCommandHandler } from './application/update/iam-update-tags.command-handler';
import { IamUpdateAndIncrementTagsCommandHandler } from './application/update/iam-update-and-increment-tags.command-handler';
import { IamUpsertTagCommandHandler } from './application/upsert/iam-upsert-tag.command-handler';
import { IamDeleteTagByIdCommandHandler } from './application/delete/iam-delete-tag-by-id.command-handler';
import { IamDeleteTagsCommandHandler } from './application/delete/iam-delete-tags.command-handler';

// query handlers
import { IamPaginateTagsQueryHandler } from './application/paginate/iam-paginate-tags.query-handler';
import { IamGetTagsQueryHandler } from './application/get/iam-get-tags.query-handler';
import { IamFindTagQueryHandler } from './application/find/iam-find-tag.query-handler';
import { IamFindTagByIdQueryHandler } from './application/find/iam-find-tag-by-id.query-handler';
import { IamRawSQLTagsQueryHandler } from './application/raw-sql/iam-raw-sql-tags.query-handler';
import { IamCountTagQueryHandler } from './application/count/iam-count-tag.query-handler';
import { IamMaxTagQueryHandler } from './application/max/iam-max-tag.query-handler';
import { IamMinTagQueryHandler } from './application/min/iam-min-tag.query-handler';
import { IamSumTagQueryHandler } from './application/sum/iam-sum-tag.query-handler';

// event handlers
import { IamCreatedTagEventHandler } from './application/events/iam-created-tag.event-handler';
import { IamCreatedTagsEventHandler } from './application/events/iam-created-tags.event-handler';
import { IamUpdatedTagEventHandler } from './application/events/iam-updated-tag.event-handler';
import { IamUpdatedTagsEventHandler } from './application/events/iam-updated-tags.event-handler';
import { IamUpdatedAndIncrementedTagsEventHandler } from './application/events/iam-updated-and-incremented-tags.event-handler';
import { IamDeletedTagEventHandler } from './application/events/iam-deleted-tag.event-handler';
import { IamDeletedTagsEventHandler } from './application/events/iam-deleted-tags.event-handler';

// services
import { IamCreateTagService } from './application/create/iam-create-tag.service';
import { IamCreateTagsService } from './application/create/iam-create-tags.service';
import { IamPaginateTagsService } from './application/paginate/iam-paginate-tags.service';
import { IamGetTagsService } from './application/get/iam-get-tags.service';
import { IamFindTagService } from './application/find/iam-find-tag.service';
import { IamFindTagByIdService } from './application/find/iam-find-tag-by-id.service';
import { IamRawSQLTagsService } from './application/raw-sql/iam-raw-sql-tags.service';
import { IamCountTagService } from './application/count/iam-count-tag.service';
import { IamMaxTagService } from './application/max/iam-max-tag.service';
import { IamMinTagService } from './application/min/iam-min-tag.service';
import { IamSumTagService } from './application/sum/iam-sum-tag.service';
import { IamUpdateTagByIdService } from './application/update/iam-update-tag-by-id.service';
import { IamUpdateTagsService } from './application/update/iam-update-tags.service';
import { IamUpdateAndIncrementTagsService } from './application/update/iam-update-and-increment-tags.service';
import { IamUpsertTagService } from './application/upsert/iam-upsert-tag.service';
import { IamDeleteTagByIdService } from './application/delete/iam-delete-tag-by-id.service';
import { IamDeleteTagsService } from './application/delete/iam-delete-tags.service';

export const IamTagHandlers = [
    // commands
    IamCreateTagCommandHandler,
    IamCreateTagsCommandHandler,
    IamUpdateTagByIdCommandHandler,
    IamUpdateTagsCommandHandler,
    IamUpdateAndIncrementTagsCommandHandler,
    IamUpsertTagCommandHandler,
    IamDeleteTagByIdCommandHandler,
    IamDeleteTagsCommandHandler,

    // queries
    IamPaginateTagsQueryHandler,
    IamGetTagsQueryHandler,
    IamFindTagQueryHandler,
    IamFindTagByIdQueryHandler,
    IamRawSQLTagsQueryHandler,
    IamCountTagQueryHandler,
    IamMaxTagQueryHandler,
    IamMinTagQueryHandler,
    IamSumTagQueryHandler,

    // events
    IamCreatedTagEventHandler,
    IamCreatedTagsEventHandler,
    IamUpdatedTagEventHandler,
    IamUpdatedTagsEventHandler,
    IamUpdatedAndIncrementedTagsEventHandler,
    IamDeletedTagEventHandler,
    IamDeletedTagsEventHandler,
];

export const IamTagServices = [
    IamCreateTagService,
    IamCreateTagsService,
    IamPaginateTagsService,
    IamGetTagsService,
    IamFindTagService,
    IamFindTagByIdService,
    IamRawSQLTagsService,
    IamCountTagService,
    IamMaxTagService,
    IamMinTagService,
    IamSumTagService,
    IamUpdateTagByIdService,
    IamUpdateTagsService,
    IamUpdateAndIncrementTagsService,
    IamUpsertTagService,
    IamDeleteTagByIdService,
    IamDeleteTagsService,
];