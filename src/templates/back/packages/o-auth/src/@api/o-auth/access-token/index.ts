// export DTOs
export { OAuthAccessTokenDto } from './dto/o-auth-access-token.dto';
export { OAuthCreateAccessTokenDto } from './dto/o-auth-create-access-token.dto';
export { OAuthUpdateAccessTokenByIdDto } from './dto/o-auth-update-access-token-by-id.dto';
export { OAuthUpdateAccessTokensDto } from './dto/o-auth-update-access-tokens.dto';

// export handlers
export { OAuthDeleteAccessTokenByIdHandler } from './handlers/o-auth-delete-access-token-by-id.handler';
export { OAuthDeleteAccessTokensHandler } from './handlers/o-auth-delete-access-tokens.handler';
export { OAuthFindAccessTokenByIdHandler } from './handlers/o-auth-find-access-token-by-id.handler';
export { OAuthFindAccessTokenHandler } from './handlers/o-auth-find-access-token.handler';
export { OAuthGetAccessTokensHandler } from './handlers/o-auth-get-access-tokens.handler';
export { OAuthPaginateAccessTokensHandler } from './handlers/o-auth-paginate-access-tokens.handler';

// export controllers
export { OAuthDeleteAccessTokenByIdController } from './controllers/o-auth-delete-access-token-by-id.controller';
export { OAuthDeleteAccessTokensController } from './controllers/o-auth-delete-access-tokens.controller';
export { OAuthFindAccessTokenByIdController } from './controllers/o-auth-find-access-token-by-id.controller';
export { OAuthFindAccessTokenController } from './controllers/o-auth-find-access-token.controller';
export { OAuthGetAccessTokensController } from './controllers/o-auth-get-access-tokens.controller';
export { OAuthPaginateAccessTokensController } from './controllers/o-auth-paginate-access-tokens.controller';

// export resolvers
export { OAuthDeleteAccessTokenByIdResolver } from './resolvers/o-auth-delete-access-token-by-id.resolver';
export { OAuthDeleteAccessTokensResolver } from './resolvers/o-auth-delete-access-tokens.resolver';
export { OAuthFindAccessTokenByIdResolver } from './resolvers/o-auth-find-access-token-by-id.resolver';
export { OAuthFindAccessTokenResolver } from './resolvers/o-auth-find-access-token.resolver';
export { OAuthGetAccessTokensResolver } from './resolvers/o-auth-get-access-tokens.resolver';
export { OAuthPaginateAccessTokensResolver } from './resolvers/o-auth-paginate-access-tokens.resolver';

// import controllers
import { OAuthDeleteAccessTokenByIdController } from './controllers/o-auth-delete-access-token-by-id.controller';
import { OAuthDeleteAccessTokensController } from './controllers/o-auth-delete-access-tokens.controller';
import { OAuthFindAccessTokenByIdController } from './controllers/o-auth-find-access-token-by-id.controller';
import { OAuthFindAccessTokenController } from './controllers/o-auth-find-access-token.controller';
import { OAuthGetAccessTokensController } from './controllers/o-auth-get-access-tokens.controller';
import { OAuthPaginateAccessTokensController } from './controllers/o-auth-paginate-access-tokens.controller';

// import resolvers
import { OAuthDeleteAccessTokenByIdResolver } from './resolvers/o-auth-delete-access-token-by-id.resolver';
import { OAuthDeleteAccessTokensResolver } from './resolvers/o-auth-delete-access-tokens.resolver';
import { OAuthFindAccessTokenByIdResolver } from './resolvers/o-auth-find-access-token-by-id.resolver';
import { OAuthFindAccessTokenResolver } from './resolvers/o-auth-find-access-token.resolver';
import { OAuthGetAccessTokensResolver } from './resolvers/o-auth-get-access-tokens.resolver';
import { OAuthPaginateAccessTokensResolver } from './resolvers/o-auth-paginate-access-tokens.resolver';

// import handlers
import { OAuthDeleteAccessTokenByIdHandler } from './handlers/o-auth-delete-access-token-by-id.handler';
import { OAuthDeleteAccessTokensHandler } from './handlers/o-auth-delete-access-tokens.handler';
import { OAuthFindAccessTokenByIdHandler } from './handlers/o-auth-find-access-token-by-id.handler';
import { OAuthFindAccessTokenHandler } from './handlers/o-auth-find-access-token.handler';
import { OAuthGetAccessTokensHandler } from './handlers/o-auth-get-access-tokens.handler';
import { OAuthPaginateAccessTokensHandler } from './handlers/o-auth-paginate-access-tokens.handler';

// import seeder

export const OAuthAccessTokenApiControllers = [
  OAuthPaginateAccessTokensController,
  OAuthGetAccessTokensController,
  OAuthFindAccessTokenByIdController,
  OAuthFindAccessTokenController,
  OAuthDeleteAccessTokenByIdController,
  OAuthDeleteAccessTokensController,
];

export const OAuthAccessTokenApiResolvers = [
  OAuthPaginateAccessTokensResolver,
  OAuthGetAccessTokensResolver,
  OAuthFindAccessTokenByIdResolver,
  OAuthFindAccessTokenResolver,
  OAuthDeleteAccessTokenByIdResolver,
  OAuthDeleteAccessTokensResolver,
];

export const OAuthAccessTokenApiHandlers = [
  OAuthPaginateAccessTokensHandler,
  OAuthGetAccessTokensHandler,
  OAuthFindAccessTokenByIdHandler,
  OAuthFindAccessTokenHandler,
  OAuthDeleteAccessTokenByIdHandler,
  OAuthDeleteAccessTokensHandler,
];

export const OAuthAccessTokenApiServices = [];
