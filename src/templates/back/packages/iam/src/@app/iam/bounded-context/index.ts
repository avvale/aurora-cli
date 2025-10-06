// export commands
export { IamCreateBoundedContextCommand } from './application/create/iam-create-bounded-context.command';
export { IamCreateBoundedContextsCommand } from './application/create/iam-create-bounded-contexts.command';
export { IamUpdateBoundedContextByIdCommand } from './application/update/iam-update-bounded-context-by-id.command';
export { IamUpdateBoundedContextsCommand } from './application/update/iam-update-bounded-contexts.command';
export { IamDeleteBoundedContextByIdCommand } from './application/delete/iam-delete-bounded-context-by-id.command';
export { IamDeleteBoundedContextsCommand } from './application/delete/iam-delete-bounded-contexts.command';

// export queries
export { IamPaginateBoundedContextsQuery } from './application/paginate/iam-paginate-bounded-contexts.query';
export { IamGetBoundedContextsQuery } from './application/get/iam-get-bounded-contexts.query';
export { IamFindBoundedContextQuery } from './application/find/iam-find-bounded-context.query';
export { IamFindBoundedContextByIdQuery } from './application/find/iam-find-bounded-context-by-id.query';

// export mocks
export { iamMockBoundedContextData } from './infrastructure/mock/iam-mock-bounded-context.data';
export { IamMockBoundedContextSeeder } from './infrastructure/mock/iam-mock-bounded-context.seeder';
export { IamMockBoundedContextRepository } from './infrastructure/mock/iam-mock-bounded-context.repository';

// export events
export { IamAddBoundedContextsContextEvent } from './application/events/iam-add-bounded-contexts-context.event';
export { IamCreatedBoundedContextsEvent } from './application/events/iam-created-bounded-contexts.event';
export { IamCreatedBoundedContextEvent } from './application/events/iam-created-bounded-context.event';
export { IamDeletedBoundedContextsEvent } from './application/events/iam-deleted-bounded-contexts.event';
export { IamDeletedBoundedContextEvent } from './application/events/iam-deleted-bounded-context.event';
export { IamUpdatedBoundedContextsEvent } from './application/events/iam-updated-bounded-contexts.event';
export { IamUpdatedBoundedContextEvent } from './application/events/iam-updated-bounded-context.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamBoundedContext } from './domain/iam-bounded-context.aggregate';
export { IamBoundedContextMapper } from './domain/iam-bounded-context.mapper';
export { IamIBoundedContextRepository } from './domain/iam-bounded-context.repository';
export { IamBoundedContextResponse } from './domain/iam-bounded-context.response';

// infrastructure
export { IamBoundedContextModel } from './infrastructure/sequelize/iam-sequelize-bounded-context.model';
export { IamSequelizeBoundedContextRepository } from './infrastructure/sequelize/iam-sequelize-bounded-context.repository';

// sagas
export { IamBoundedContextSagas } from './application/sagas/iam-bounded-context.sagas';

// command handlers
import { IamCreateBoundedContextCommandHandler } from './application/create/iam-create-bounded-context.command-handler';
import { IamCreateBoundedContextsCommandHandler } from './application/create/iam-create-bounded-contexts.command-handler';
import { IamUpdateBoundedContextByIdCommandHandler } from './application/update/iam-update-bounded-context-by-id.command-handler';
import { IamUpdateBoundedContextsCommandHandler } from './application/update/iam-update-bounded-contexts.command-handler';
import { IamDeleteBoundedContextByIdCommandHandler } from './application/delete/iam-delete-bounded-context-by-id.command-handler';
import { IamDeleteBoundedContextsCommandHandler } from './application/delete/iam-delete-bounded-contexts.command-handler';

// query handlers
import { IamPaginateBoundedContextsQueryHandler } from './application/paginate/iam-paginate-bounded-contexts.query-handler';
import { IamGetBoundedContextsQueryHandler } from './application/get/iam-get-bounded-contexts.query-handler';
import { IamFindBoundedContextQueryHandler } from './application/find/iam-find-bounded-context.query-handler';
import { IamFindBoundedContextByIdQueryHandler } from './application/find/iam-find-bounded-context-by-id.query-handler';

// event handlers
import { IamCreatedBoundedContextEventHandler } from './application/events/iam-created-bounded-context.event-handler';
import { IamCreatedBoundedContextsEventHandler } from './application/events/iam-created-bounded-contexts.event-handler';
import { IamUpdatedBoundedContextEventHandler } from './application/events/iam-updated-bounded-context.event-handler';
import { IamUpdatedBoundedContextsEventHandler } from './application/events/iam-updated-bounded-contexts.event-handler';
import { IamDeletedBoundedContextEventHandler } from './application/events/iam-deleted-bounded-context.event-handler';
import { IamDeletedBoundedContextsEventHandler } from './application/events/iam-deleted-bounded-contexts.event-handler';

// services
import { IamCreateBoundedContextService } from './application/create/iam-create-bounded-context.service';
import { IamCreateBoundedContextsService } from './application/create/iam-create-bounded-contexts.service';
import { IamPaginateBoundedContextsService } from './application/paginate/iam-paginate-bounded-contexts.service';
import { IamGetBoundedContextsService } from './application/get/iam-get-bounded-contexts.service';
import { IamFindBoundedContextService } from './application/find/iam-find-bounded-context.service';
import { IamFindBoundedContextByIdService } from './application/find/iam-find-bounded-context-by-id.service';
import { IamUpdateBoundedContextByIdService } from './application/update/iam-update-bounded-context-by-id.service';
import { IamUpdateBoundedContextsService } from './application/update/iam-update-bounded-contexts.service';
import { IamDeleteBoundedContextByIdService } from './application/delete/iam-delete-bounded-context-by-id.service';
import { IamDeleteBoundedContextsService } from './application/delete/iam-delete-bounded-contexts.service';

// ---- customizations ----
export { IamBoundedContextHelper } from './domain/iam-bounded-context-helper';

export const IamBoundedContextHandlers = [
    // commands
    IamCreateBoundedContextCommandHandler,
    IamCreateBoundedContextsCommandHandler,
    IamUpdateBoundedContextByIdCommandHandler,
    IamUpdateBoundedContextsCommandHandler,
    IamDeleteBoundedContextByIdCommandHandler,
    IamDeleteBoundedContextsCommandHandler,

    // queries
    IamPaginateBoundedContextsQueryHandler,
    IamGetBoundedContextsQueryHandler,
    IamFindBoundedContextQueryHandler,
    IamFindBoundedContextByIdQueryHandler,

    // events
    IamCreatedBoundedContextEventHandler,
    IamCreatedBoundedContextsEventHandler,
    IamUpdatedBoundedContextEventHandler,
    IamUpdatedBoundedContextsEventHandler,
    IamDeletedBoundedContextEventHandler,
    IamDeletedBoundedContextsEventHandler,
];

export const IamBoundedContextServices = [
    IamCreateBoundedContextService,
    IamCreateBoundedContextsService,
    IamPaginateBoundedContextsService,
    IamGetBoundedContextsService,
    IamFindBoundedContextService,
    IamFindBoundedContextByIdService,
    IamUpdateBoundedContextByIdService,
    IamUpdateBoundedContextsService,
    IamDeleteBoundedContextByIdService,
    IamDeleteBoundedContextsService,
];