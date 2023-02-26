// controllers
import { OAuthCreateScopeController } from './controllers/o-auth-create-scope.controller';
import { OAuthCreateScopesController } from './controllers/o-auth-create-scopes.controller';
import { OAuthPaginateScopesController } from './controllers/o-auth-paginate-scopes.controller';
import { OAuthGetScopesController } from './controllers/o-auth-get-scopes.controller';
import { OAuthFindScopeByIdController } from './controllers/o-auth-find-scope-by-id.controller';
import { OAuthFindScopeController } from './controllers/o-auth-find-scope.controller';
import { OAuthUpdateScopeByIdController } from './controllers/o-auth-update-scope-by-id.controller';
import { OAuthUpdateScopesController } from './controllers/o-auth-update-scopes.controller';
import { OAuthUpsertScopeController } from './controllers/o-auth-upsert-scope.controller';
import { OAuthDeleteScopeByIdController } from './controllers/o-auth-delete-scope-by-id.controller';
import { OAuthDeleteScopesController } from './controllers/o-auth-delete-scopes.controller';

// resolvers
import { OAuthCreateScopeResolver } from './resolvers/o-auth-create-scope.resolver';
import { OAuthCreateScopesResolver } from './resolvers/o-auth-create-scopes.resolver';
import { OAuthPaginateScopesResolver } from './resolvers/o-auth-paginate-scopes.resolver';
import { OAuthGetScopesResolver } from './resolvers/o-auth-get-scopes.resolver';
import { OAuthFindScopeByIdResolver } from './resolvers/o-auth-find-scope-by-id.resolver';
import { OAuthFindScopeResolver } from './resolvers/o-auth-find-scope.resolver';
import { OAuthUpdateScopeByIdResolver } from './resolvers/o-auth-update-scope-by-id.resolver';
import { OAuthUpdateScopesResolver } from './resolvers/o-auth-update-scopes.resolver';
import { OAuthUpsertScopeResolver } from './resolvers/o-auth-upsert-scope.resolver';
import { OAuthDeleteScopeByIdResolver } from './resolvers/o-auth-delete-scope-by-id.resolver';
import { OAuthDeleteScopesResolver } from './resolvers/o-auth-delete-scopes.resolver';

// handlers
import { OAuthCreateScopeHandler } from './handlers/o-auth-create-scope.handler';
import { OAuthCreateScopesHandler } from './handlers/o-auth-create-scopes.handler';
import { OAuthPaginateScopesHandler } from './handlers/o-auth-paginate-scopes.handler';
import { OAuthGetScopesHandler } from './handlers/o-auth-get-scopes.handler';
import { OAuthFindScopeByIdHandler } from './handlers/o-auth-find-scope-by-id.handler';
import { OAuthFindScopeHandler } from './handlers/o-auth-find-scope.handler';
import { OAuthUpdateScopeByIdHandler } from './handlers/o-auth-update-scope-by-id.handler';
import { OAuthUpdateScopesHandler } from './handlers/o-auth-update-scopes.handler';
import { OAuthUpsertScopeHandler } from './handlers/o-auth-upsert-scope.handler';
import { OAuthDeleteScopeByIdHandler } from './handlers/o-auth-delete-scope-by-id.handler';
import { OAuthDeleteScopesHandler } from './handlers/o-auth-delete-scopes.handler';

// seeder
import { OAuthScopeSeeder } from './seeder/o-auth-scope.seeder';

export const OAuthScopeControllers = [
    OAuthCreateScopeController,
    OAuthCreateScopesController,
    OAuthPaginateScopesController,
    OAuthGetScopesController,
    OAuthFindScopeByIdController,
    OAuthFindScopeController,
    OAuthUpdateScopeByIdController,
    OAuthUpdateScopesController,
    OAuthUpsertScopeController,
    OAuthDeleteScopeByIdController,
    OAuthDeleteScopesController,
];

export const OAuthScopeResolvers = [
    OAuthCreateScopeResolver,
    OAuthCreateScopesResolver,
    OAuthPaginateScopesResolver,
    OAuthGetScopesResolver,
    OAuthFindScopeByIdResolver,
    OAuthFindScopeResolver,
    OAuthUpdateScopeByIdResolver,
    OAuthUpdateScopesResolver,
    OAuthUpsertScopeResolver,
    OAuthDeleteScopeByIdResolver,
    OAuthDeleteScopesResolver,
];

export const OAuthScopeApiHandlers = [
    OAuthCreateScopeHandler,
    OAuthCreateScopesHandler,
    OAuthPaginateScopesHandler,
    OAuthGetScopesHandler,
    OAuthFindScopeByIdHandler,
    OAuthFindScopeHandler,
    OAuthUpdateScopeByIdHandler,
    OAuthUpdateScopesHandler,
    OAuthUpsertScopeHandler,
    OAuthDeleteScopeByIdHandler,
    OAuthDeleteScopesHandler,
];

export const OAuthScopeServices = [
    OAuthScopeSeeder,
];