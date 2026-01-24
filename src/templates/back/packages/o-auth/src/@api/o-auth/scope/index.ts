// export DTOs
export { OAuthCreateScopeDto } from './dto/o-auth-create-scope.dto';
export { OAuthScopeDto } from './dto/o-auth-scope.dto';
export { OAuthUpdateScopeByIdDto } from './dto/o-auth-update-scope-by-id.dto';
export { OAuthUpdateScopesDto } from './dto/o-auth-update-scopes.dto';

// export handlers
export { OAuthCreateScopeHandler } from './handlers/o-auth-create-scope.handler';
export { OAuthDeleteScopeByIdHandler } from './handlers/o-auth-delete-scope-by-id.handler';
export { OAuthDeleteScopesHandler } from './handlers/o-auth-delete-scopes.handler';
export { OAuthFindScopeByIdHandler } from './handlers/o-auth-find-scope-by-id.handler';
export { OAuthFindScopeHandler } from './handlers/o-auth-find-scope.handler';
export { OAuthGetScopesHandler } from './handlers/o-auth-get-scopes.handler';
export { OAuthPaginateScopesHandler } from './handlers/o-auth-paginate-scopes.handler';
export { OAuthUpdateScopeByIdHandler } from './handlers/o-auth-update-scope-by-id.handler';

// export controllers
export { OAuthCreateScopeController } from './controllers/o-auth-create-scope.controller';
export { OAuthDeleteScopeByIdController } from './controllers/o-auth-delete-scope-by-id.controller';
export { OAuthDeleteScopesController } from './controllers/o-auth-delete-scopes.controller';
export { OAuthFindScopeByIdController } from './controllers/o-auth-find-scope-by-id.controller';
export { OAuthFindScopeController } from './controllers/o-auth-find-scope.controller';
export { OAuthGetScopesController } from './controllers/o-auth-get-scopes.controller';
export { OAuthPaginateScopesController } from './controllers/o-auth-paginate-scopes.controller';
export { OAuthUpdateScopeByIdController } from './controllers/o-auth-update-scope-by-id.controller';

// export resolvers
export { OAuthCreateScopeResolver } from './resolvers/o-auth-create-scope.resolver';
export { OAuthDeleteScopeByIdResolver } from './resolvers/o-auth-delete-scope-by-id.resolver';
export { OAuthDeleteScopesResolver } from './resolvers/o-auth-delete-scopes.resolver';
export { OAuthFindScopeByIdResolver } from './resolvers/o-auth-find-scope-by-id.resolver';
export { OAuthFindScopeResolver } from './resolvers/o-auth-find-scope.resolver';
export { OAuthGetScopesResolver } from './resolvers/o-auth-get-scopes.resolver';
export { OAuthPaginateScopesResolver } from './resolvers/o-auth-paginate-scopes.resolver';
export { OAuthUpdateScopeByIdResolver } from './resolvers/o-auth-update-scope-by-id.resolver';

// import controllers
import { OAuthCreateScopeController } from './controllers/o-auth-create-scope.controller';
import { OAuthDeleteScopeByIdController } from './controllers/o-auth-delete-scope-by-id.controller';
import { OAuthDeleteScopesController } from './controllers/o-auth-delete-scopes.controller';
import { OAuthFindScopeByIdController } from './controllers/o-auth-find-scope-by-id.controller';
import { OAuthFindScopeController } from './controllers/o-auth-find-scope.controller';
import { OAuthGetScopesController } from './controllers/o-auth-get-scopes.controller';
import { OAuthPaginateScopesController } from './controllers/o-auth-paginate-scopes.controller';
import { OAuthUpdateScopeByIdController } from './controllers/o-auth-update-scope-by-id.controller';

// import resolvers
import { OAuthCreateScopeResolver } from './resolvers/o-auth-create-scope.resolver';
import { OAuthDeleteScopeByIdResolver } from './resolvers/o-auth-delete-scope-by-id.resolver';
import { OAuthDeleteScopesResolver } from './resolvers/o-auth-delete-scopes.resolver';
import { OAuthFindScopeByIdResolver } from './resolvers/o-auth-find-scope-by-id.resolver';
import { OAuthFindScopeResolver } from './resolvers/o-auth-find-scope.resolver';
import { OAuthGetScopesResolver } from './resolvers/o-auth-get-scopes.resolver';
import { OAuthPaginateScopesResolver } from './resolvers/o-auth-paginate-scopes.resolver';
import { OAuthUpdateScopeByIdResolver } from './resolvers/o-auth-update-scope-by-id.resolver';

// import handlers
import { OAuthCreateScopeHandler } from './handlers/o-auth-create-scope.handler';
import { OAuthDeleteScopeByIdHandler } from './handlers/o-auth-delete-scope-by-id.handler';
import { OAuthDeleteScopesHandler } from './handlers/o-auth-delete-scopes.handler';
import { OAuthFindScopeByIdHandler } from './handlers/o-auth-find-scope-by-id.handler';
import { OAuthFindScopeHandler } from './handlers/o-auth-find-scope.handler';
import { OAuthGetScopesHandler } from './handlers/o-auth-get-scopes.handler';
import { OAuthPaginateScopesHandler } from './handlers/o-auth-paginate-scopes.handler';
import { OAuthUpdateScopeByIdHandler } from './handlers/o-auth-update-scope-by-id.handler';

// import seeder
import { OAuthScopeSeeder } from './seeder/o-auth-scope.seeder';

export const OAuthScopeApiControllers = [
  OAuthCreateScopeController,
  OAuthPaginateScopesController,
  OAuthGetScopesController,
  OAuthFindScopeByIdController,
  OAuthFindScopeController,
  OAuthUpdateScopeByIdController,
  OAuthDeleteScopeByIdController,
  OAuthDeleteScopesController,
];

export const OAuthScopeApiResolvers = [
  OAuthCreateScopeResolver,
  OAuthPaginateScopesResolver,
  OAuthGetScopesResolver,
  OAuthFindScopeByIdResolver,
  OAuthFindScopeResolver,
  OAuthUpdateScopeByIdResolver,
  OAuthDeleteScopeByIdResolver,
  OAuthDeleteScopesResolver,
];

export const OAuthScopeApiHandlers = [
  OAuthCreateScopeHandler,
  OAuthPaginateScopesHandler,
  OAuthGetScopesHandler,
  OAuthFindScopeByIdHandler,
  OAuthFindScopeHandler,
  OAuthUpdateScopeByIdHandler,
  OAuthDeleteScopeByIdHandler,
  OAuthDeleteScopesHandler,
];

export const OAuthScopeApiServices = [OAuthScopeSeeder];
