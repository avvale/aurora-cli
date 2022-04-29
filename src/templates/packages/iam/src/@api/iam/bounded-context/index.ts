// controllers
import { IamCreateBoundedContextController } from './controllers/iam-create-bounded-context.controller';
import { IamCreateBoundedContextsController } from './controllers/iam-create-bounded-contexts.controller';
import { IamPaginateBoundedContextsController } from './controllers/iam-paginate-bounded-contexts.controller';
import { IamGetBoundedContextsController } from './controllers/iam-get-bounded-contexts.controller';
import { IamFindBoundedContextByIdController } from './controllers/iam-find-bounded-context-by-id.controller';
import { IamFindBoundedContextController } from './controllers/iam-find-bounded-context.controller';
import { IamUpdateBoundedContextController } from './controllers/iam-update-bounded-context.controller';
import { IamDeleteBoundedContextByIdController } from './controllers/iam-delete-bounded-context-by-id.controller';
import { IamDeleteBoundedContextsController } from './controllers/iam-delete-bounded-contexts.controller';

// resolvers
import { IamCreateBoundedContextResolver } from './resolvers/iam-create-bounded-context.resolver';
import { IamCreateBoundedContextsResolver } from './resolvers/iam-create-bounded-contexts.resolver';
import { IamPaginateBoundedContextsResolver } from './resolvers/iam-paginate-bounded-contexts.resolver';
import { IamGetBoundedContextsResolver } from './resolvers/iam-get-bounded-contexts.resolver';
import { IamFindBoundedContextByIdResolver } from './resolvers/iam-find-bounded-context-by-id.resolver';
import { IamFindBoundedContextResolver } from './resolvers/iam-find-bounded-context.resolver';
import { IamUpdateBoundedContextResolver } from './resolvers/iam-update-bounded-context.resolver';
import { IamDeleteBoundedContextByIdResolver } from './resolvers/iam-delete-bounded-context-by-id.resolver';
import { IamDeleteBoundedContextsResolver } from './resolvers/iam-delete-bounded-contexts.resolver';

// handlers
import { IamCreateBoundedContextHandler } from './handlers/iam-create-bounded-context.handler';
import { IamCreateBoundedContextsHandler } from './handlers/iam-create-bounded-contexts.handler';
import { IamPaginateBoundedContextsHandler } from './handlers/iam-paginate-bounded-contexts.handler';
import { IamGetBoundedContextsHandler } from './handlers/iam-get-bounded-contexts.handler';
import { IamFindBoundedContextByIdHandler } from './handlers/iam-find-bounded-context-by-id.handler';
import { IamFindBoundedContextHandler } from './handlers/iam-find-bounded-context.handler';
import { IamUpdateBoundedContextHandler } from './handlers/iam-update-bounded-context.handler';
import { IamDeleteBoundedContextByIdHandler } from './handlers/iam-delete-bounded-context-by-id.handler';
import { IamDeleteBoundedContextsHandler } from './handlers/iam-delete-bounded-contexts.handler';

export const IamBoundedContextControllers = [
    IamCreateBoundedContextController,
    IamCreateBoundedContextsController,
    IamPaginateBoundedContextsController,
    IamGetBoundedContextsController,
    IamFindBoundedContextByIdController,
    IamFindBoundedContextController,
    IamUpdateBoundedContextController,
    IamDeleteBoundedContextByIdController,
    IamDeleteBoundedContextsController,
];

export const IamBoundedContextResolvers = [
    IamCreateBoundedContextResolver,
    IamCreateBoundedContextsResolver,
    IamPaginateBoundedContextsResolver,
    IamGetBoundedContextsResolver,
    IamFindBoundedContextByIdResolver,
    IamFindBoundedContextResolver,
    IamUpdateBoundedContextResolver,
    IamDeleteBoundedContextByIdResolver,
    IamDeleteBoundedContextsResolver,
];

export const IamBoundedContextApiHandlers = [
    IamCreateBoundedContextHandler,
    IamCreateBoundedContextsHandler,
    IamPaginateBoundedContextsHandler,
    IamGetBoundedContextsHandler,
    IamFindBoundedContextByIdHandler,
    IamFindBoundedContextHandler,
    IamUpdateBoundedContextHandler,
    IamDeleteBoundedContextByIdHandler,
    IamDeleteBoundedContextsHandler,
];