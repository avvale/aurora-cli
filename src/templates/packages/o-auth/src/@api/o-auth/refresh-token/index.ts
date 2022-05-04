// controllers
import { OAuthPaginateRefreshTokensController } from './controllers/o-auth-paginate-refresh-tokens.controller';
import { OAuthGetRefreshTokensController } from './controllers/o-auth-get-refresh-tokens.controller';
import { OAuthFindRefreshTokenByIdController } from './controllers/o-auth-find-refresh-token-by-id.controller';
import { OAuthFindRefreshTokenController } from './controllers/o-auth-find-refresh-token.controller';
import { OAuthDeleteRefreshTokenByIdController } from './controllers/o-auth-delete-refresh-token-by-id.controller';
import { OAuthDeleteRefreshTokensController } from './controllers/o-auth-delete-refresh-tokens.controller';

// resolvers
import { OAuthPaginateRefreshTokensResolver } from './resolvers/o-auth-paginate-refresh-tokens.resolver';
import { OAuthGetRefreshTokensResolver } from './resolvers/o-auth-get-refresh-tokens.resolver';
import { OAuthFindRefreshTokenByIdResolver } from './resolvers/o-auth-find-refresh-token-by-id.resolver';
import { OAuthFindRefreshTokenResolver } from './resolvers/o-auth-find-refresh-token.resolver';
import { OAuthDeleteRefreshTokenByIdResolver } from './resolvers/o-auth-delete-refresh-token-by-id.resolver';
import { OAuthDeleteRefreshTokensResolver } from './resolvers/o-auth-delete-refresh-tokens.resolver';

// handlers
import { OAuthPaginateRefreshTokensHandler } from './handlers/o-auth-paginate-refresh-tokens.handler';
import { OAuthGetRefreshTokensHandler } from './handlers/o-auth-get-refresh-tokens.handler';
import { OAuthFindRefreshTokenByIdHandler } from './handlers/o-auth-find-refresh-token-by-id.handler';
import { OAuthFindRefreshTokenHandler } from './handlers/o-auth-find-refresh-token.handler';
import { OAuthDeleteRefreshTokenByIdHandler } from './handlers/o-auth-delete-refresh-token-by-id.handler';
import { OAuthDeleteRefreshTokensHandler } from './handlers/o-auth-delete-refresh-tokens.handler';

export const OAuthRefreshTokenControllers = [
    OAuthPaginateRefreshTokensController,
    OAuthGetRefreshTokensController,
    OAuthFindRefreshTokenByIdController,
    OAuthFindRefreshTokenController,
    OAuthDeleteRefreshTokenByIdController,
    OAuthDeleteRefreshTokensController,
];

export const OAuthRefreshTokenResolvers = [
    OAuthPaginateRefreshTokensResolver,
    OAuthGetRefreshTokensResolver,
    OAuthFindRefreshTokenByIdResolver,
    OAuthFindRefreshTokenResolver,
    OAuthDeleteRefreshTokenByIdResolver,
    OAuthDeleteRefreshTokensResolver,
];

export const OAuthRefreshTokenApiHandlers = [
    OAuthPaginateRefreshTokensHandler,
    OAuthGetRefreshTokensHandler,
    OAuthFindRefreshTokenByIdHandler,
    OAuthFindRefreshTokenHandler,
    OAuthDeleteRefreshTokenByIdHandler,
    OAuthDeleteRefreshTokensHandler,
];