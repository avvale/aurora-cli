// controllers
import { OAuthCreateRefreshTokenController } from './controllers/o-auth-create-refresh-token.controller';
import { OAuthCreateRefreshTokensController } from './controllers/o-auth-create-refresh-tokens.controller';
import { OAuthPaginateRefreshTokensController } from './controllers/o-auth-paginate-refresh-tokens.controller';
import { OAuthGetRefreshTokensController } from './controllers/o-auth-get-refresh-tokens.controller';
import { OAuthFindRefreshTokenByIdController } from './controllers/o-auth-find-refresh-token-by-id.controller';
import { OAuthFindRefreshTokenController } from './controllers/o-auth-find-refresh-token.controller';
import { OAuthUpdateRefreshTokenController } from './controllers/o-auth-update-refresh-token.controller';
import { OAuthDeleteRefreshTokenByIdController } from './controllers/o-auth-delete-refresh-token-by-id.controller';
import { OAuthDeleteRefreshTokensController } from './controllers/o-auth-delete-refresh-tokens.controller';

// resolvers
import { OAuthCreateRefreshTokenResolver } from './resolvers/o-auth-create-refresh-token.resolver';
import { OAuthCreateRefreshTokensResolver } from './resolvers/o-auth-create-refresh-tokens.resolver';
import { OAuthPaginateRefreshTokensResolver } from './resolvers/o-auth-paginate-refresh-tokens.resolver';
import { OAuthGetRefreshTokensResolver } from './resolvers/o-auth-get-refresh-tokens.resolver';
import { OAuthFindRefreshTokenByIdResolver } from './resolvers/o-auth-find-refresh-token-by-id.resolver';
import { OAuthFindRefreshTokenResolver } from './resolvers/o-auth-find-refresh-token.resolver';
import { OAuthUpdateRefreshTokenResolver } from './resolvers/o-auth-update-refresh-token.resolver';
import { OAuthDeleteRefreshTokenByIdResolver } from './resolvers/o-auth-delete-refresh-token-by-id.resolver';
import { OAuthDeleteRefreshTokensResolver } from './resolvers/o-auth-delete-refresh-tokens.resolver';

// handlers
import { OAuthCreateRefreshTokenHandler } from './handlers/o-auth-create-refresh-token.handler';
import { OAuthCreateRefreshTokensHandler } from './handlers/o-auth-create-refresh-tokens.handler';
import { OAuthPaginateRefreshTokensHandler } from './handlers/o-auth-paginate-refresh-tokens.handler';
import { OAuthGetRefreshTokensHandler } from './handlers/o-auth-get-refresh-tokens.handler';
import { OAuthFindRefreshTokenByIdHandler } from './handlers/o-auth-find-refresh-token-by-id.handler';
import { OAuthFindRefreshTokenHandler } from './handlers/o-auth-find-refresh-token.handler';
import { OAuthUpdateRefreshTokenHandler } from './handlers/o-auth-update-refresh-token.handler';
import { OAuthDeleteRefreshTokenByIdHandler } from './handlers/o-auth-delete-refresh-token-by-id.handler';
import { OAuthDeleteRefreshTokensHandler } from './handlers/o-auth-delete-refresh-tokens.handler';

export const OAuthRefreshTokenControllers = [
    OAuthCreateRefreshTokenController,
    OAuthCreateRefreshTokensController,
    OAuthPaginateRefreshTokensController,
    OAuthGetRefreshTokensController,
    OAuthFindRefreshTokenByIdController,
    OAuthFindRefreshTokenController,
    OAuthUpdateRefreshTokenController,
    OAuthDeleteRefreshTokenByIdController,
    OAuthDeleteRefreshTokensController,
];

export const OAuthRefreshTokenResolvers = [
    OAuthCreateRefreshTokenResolver,
    OAuthCreateRefreshTokensResolver,
    OAuthPaginateRefreshTokensResolver,
    OAuthGetRefreshTokensResolver,
    OAuthFindRefreshTokenByIdResolver,
    OAuthFindRefreshTokenResolver,
    OAuthUpdateRefreshTokenResolver,
    OAuthDeleteRefreshTokenByIdResolver,
    OAuthDeleteRefreshTokensResolver,
];

export const OAuthRefreshTokenApiHandlers = [
    OAuthCreateRefreshTokenHandler,
    OAuthCreateRefreshTokensHandler,
    OAuthPaginateRefreshTokensHandler,
    OAuthGetRefreshTokensHandler,
    OAuthFindRefreshTokenByIdHandler,
    OAuthFindRefreshTokenHandler,
    OAuthUpdateRefreshTokenHandler,
    OAuthDeleteRefreshTokenByIdHandler,
    OAuthDeleteRefreshTokensHandler,
];