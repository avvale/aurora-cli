// export commands
export { IamCreateTagCommand } from './application/create/iam-create-tag.command';
export { IamDeleteTagByIdCommand } from './application/delete/iam-delete-tag-by-id.command';
export { IamUpdateTagByIdCommand } from './application/update/iam-update-tag-by-id.command';

// export queries
export { IamFindTagByIdQuery } from './application/find/iam-find-tag-by-id.query';
export { IamFindTagQuery } from './application/find/iam-find-tag.query';
export { IamGetTagsQuery } from './application/get/iam-get-tags.query';
export { IamPaginateTagsQuery } from './application/paginate/iam-paginate-tags.query';

// export mocks
export { iamMockTagData } from './infrastructure/mock/iam-mock-tag.data';
export { IamMockTagRepository } from './infrastructure/mock/iam-mock-tag.repository';
export { IamMockTagSeeder } from './infrastructure/mock/iam-mock-tag.seeder';

// export events
export { IamAddTagsContextEvent } from './application/events/iam-add-tags-context.event';
export { IamCreatedTagEvent } from './application/events/iam-created-tag.event';
export { IamCreatedTagsEvent } from './application/events/iam-created-tags.event';
export { IamDeletedTagEvent } from './application/events/iam-deleted-tag.event';
export { IamUpdatedTagEvent } from './application/events/iam-updated-tag.event';

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
import { IamDeleteTagByIdCommandHandler } from './application/delete/iam-delete-tag-by-id.command-handler';
import { IamUpdateTagByIdCommandHandler } from './application/update/iam-update-tag-by-id.command-handler';

// query handlers
import { IamFindTagByIdQueryHandler } from './application/find/iam-find-tag-by-id.query-handler';
import { IamFindTagQueryHandler } from './application/find/iam-find-tag.query-handler';
import { IamGetTagsQueryHandler } from './application/get/iam-get-tags.query-handler';
import { IamPaginateTagsQueryHandler } from './application/paginate/iam-paginate-tags.query-handler';

// event handlers
import { IamCreatedTagEventHandler } from './application/events/iam-created-tag.event-handler';
import { IamCreatedTagsEventHandler } from './application/events/iam-created-tags.event-handler';
import { IamDeletedTagEventHandler } from './application/events/iam-deleted-tag.event-handler';
import { IamUpdatedTagEventHandler } from './application/events/iam-updated-tag.event-handler';

// services
import { IamCreateTagService } from './application/create/iam-create-tag.service';
import { IamDeleteTagByIdService } from './application/delete/iam-delete-tag-by-id.service';
import { IamFindTagByIdService } from './application/find/iam-find-tag-by-id.service';
import { IamFindTagService } from './application/find/iam-find-tag.service';
import { IamGetTagsService } from './application/get/iam-get-tags.service';
import { IamPaginateTagsService } from './application/paginate/iam-paginate-tags.service';
import { IamUpdateTagByIdService } from './application/update/iam-update-tag-by-id.service';

export const IamTagHandlers = [
  // commands
  IamCreateTagCommandHandler,
  IamUpdateTagByIdCommandHandler,
  IamDeleteTagByIdCommandHandler,

  // queries
  IamPaginateTagsQueryHandler,
  IamGetTagsQueryHandler,
  IamFindTagQueryHandler,
  IamFindTagByIdQueryHandler,

  // events
  IamCreatedTagEventHandler,
  IamCreatedTagsEventHandler,
  IamUpdatedTagEventHandler,
  IamDeletedTagEventHandler,
];

export const IamTagServices = [
  IamCreateTagService,
  IamPaginateTagsService,
  IamGetTagsService,
  IamFindTagService,
  IamFindTagByIdService,
  IamUpdateTagByIdService,
  IamDeleteTagByIdService,
];
