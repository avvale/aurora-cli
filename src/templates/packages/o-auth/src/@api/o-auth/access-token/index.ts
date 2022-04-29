// controllers
import { OAuthCreateAccessTokenController } from './controllers/o-auth-create-access-token.controller';
import { OAuthCreateAccessTokensController } from './controllers/o-auth-create-access-tokens.controller';
import { OAuthPaginateAccessTokensController } from './controllers/o-auth-paginate-access-tokens.controller';
import { OAuthGetAccessTokensController } from './controllers/o-auth-get-access-tokens.controller';
import { OAuthFindAccessTokenByIdController } from './controllers/o-auth-find-access-token-by-id.controller';
import { OAuthFindAccessTokenController } from './controllers/o-auth-find-access-token.controller';
import { OAuthUpdateAccessTokenController } from './controllers/o-auth-update-access-token.controller';
import { OAuthDeleteAccessTokenByIdController } from './controllers/o-auth-delete-access-token-by-id.controller';
import { OAuthDeleteAccessTokensController } from './controllers/o-auth-delete-access-tokens.controller';

// resolvers
import { OAuthCreateAccessTokenResolver } from './resolvers/o-auth-create-access-token.resolver';
import { OAuthCreateAccessTokensResolver } from './resolvers/o-auth-create-access-tokens.resolver';
import { OAuthPaginateAccessTokensResolver } from './resolvers/o-auth-paginate-access-tokens.resolver';
import { OAuthGetAccessTokensResolver } from './resolvers/o-auth-get-access-tokens.resolver';
import { OAuthFindAccessTokenByIdResolver } from './resolvers/o-auth-find-access-token-by-id.resolver';
import { OAuthFindAccessTokenResolver } from './resolvers/o-auth-find-access-token.resolver';
import { OAuthUpdateAccessTokenResolver } from './resolvers/o-auth-update-access-token.resolver';
import { OAuthDeleteAccessTokenByIdResolver } from './resolvers/o-auth-delete-access-token-by-id.resolver';
import { OAuthDeleteAccessTokensResolver } from './resolvers/o-auth-delete-access-tokens.resolver';

// handlers
import { OAuthCreateAccessTokenHandler } from './handlers/o-auth-create-access-token.handler';
import { OAuthCreateAccessTokensHandler } from './handlers/o-auth-create-access-tokens.handler';
import { OAuthPaginateAccessTokensHandler } from './handlers/o-auth-paginate-access-tokens.handler';
import { OAuthGetAccessTokensHandler } from './handlers/o-auth-get-access-tokens.handler';
import { OAuthFindAccessTokenByIdHandler } from './handlers/o-auth-find-access-token-by-id.handler';
import { OAuthFindAccessTokenHandler } from './handlers/o-auth-find-access-token.handler';
import { OAuthUpdateAccessTokenHandler } from './handlers/o-auth-update-access-token.handler';
import { OAuthDeleteAccessTokenByIdHandler } from './handlers/o-auth-delete-access-token-by-id.handler';
import { OAuthDeleteAccessTokensHandler } from './handlers/o-auth-delete-access-tokens.handler';

export const OAuthAccessTokenControllers = [
    OAuthCreateAccessTokenController,
    OAuthCreateAccessTokensController,
    OAuthPaginateAccessTokensController,
    OAuthGetAccessTokensController,
    OAuthFindAccessTokenByIdController,
    OAuthFindAccessTokenController,
    OAuthUpdateAccessTokenController,
    OAuthDeleteAccessTokenByIdController,
    OAuthDeleteAccessTokensController,
];

export const OAuthAccessTokenResolvers = [
    OAuthCreateAccessTokenResolver,
    OAuthCreateAccessTokensResolver,
    OAuthPaginateAccessTokensResolver,
    OAuthGetAccessTokensResolver,
    OAuthFindAccessTokenByIdResolver,
    OAuthFindAccessTokenResolver,
    OAuthUpdateAccessTokenResolver,
    OAuthDeleteAccessTokenByIdResolver,
    OAuthDeleteAccessTokensResolver,
];

export const OAuthAccessTokenApiHandlers = [
    OAuthCreateAccessTokenHandler,
    OAuthCreateAccessTokensHandler,
    OAuthPaginateAccessTokensHandler,
    OAuthGetAccessTokensHandler,
    OAuthFindAccessTokenByIdHandler,
    OAuthFindAccessTokenHandler,
    OAuthUpdateAccessTokenHandler,
    OAuthDeleteAccessTokenByIdHandler,
    OAuthDeleteAccessTokensHandler,
];