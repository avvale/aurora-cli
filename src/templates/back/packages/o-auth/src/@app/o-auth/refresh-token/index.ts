// export commands
export { OAuthCreateRefreshTokenCommand } from './application/create/o-auth-create-refresh-token.command';
export { OAuthDeleteRefreshTokenByIdCommand } from './application/delete/o-auth-delete-refresh-token-by-id.command';
export { OAuthDeleteRefreshTokensCommand } from './application/delete/o-auth-delete-refresh-tokens.command';

// export queries
export { OAuthFindRefreshTokenByIdQuery } from './application/find/o-auth-find-refresh-token-by-id.query';
export { OAuthFindRefreshTokenQuery } from './application/find/o-auth-find-refresh-token.query';
export { OAuthGetRefreshTokensQuery } from './application/get/o-auth-get-refresh-tokens.query';
export { OAuthPaginateRefreshTokensQuery } from './application/paginate/o-auth-paginate-refresh-tokens.query';

// export mocks
export { oAuthMockRefreshTokenData } from './infrastructure/mock/o-auth-mock-refresh-token.data';
export { OAuthMockRefreshTokenRepository } from './infrastructure/mock/o-auth-mock-refresh-token.repository';
export { OAuthMockRefreshTokenSeeder } from './infrastructure/mock/o-auth-mock-refresh-token.seeder';

// export events
export { OAuthAddRefreshTokensContextEvent } from './application/events/o-auth-add-refresh-tokens-context.event';
export { OAuthCreatedRefreshTokenEvent } from './application/events/o-auth-created-refresh-token.event';
export { OAuthDeletedRefreshTokenEvent } from './application/events/o-auth-deleted-refresh-token.event';
export { OAuthDeletedRefreshTokensEvent } from './application/events/o-auth-deleted-refresh-tokens.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { OAuthRefreshToken } from './domain/o-auth-refresh-token.aggregate';
export { OAuthRefreshTokenMapper } from './domain/o-auth-refresh-token.mapper';
export { OAuthIRefreshTokenRepository } from './domain/o-auth-refresh-token.repository';
export { OAuthRefreshTokenResponse } from './domain/o-auth-refresh-token.response';

// infrastructure
export { OAuthRefreshTokenModel } from './infrastructure/sequelize/o-auth-sequelize-refresh-token.model';
export { OAuthSequelizeRefreshTokenRepository } from './infrastructure/sequelize/o-auth-sequelize-refresh-token.repository';

// sagas
export { OAuthRefreshTokenSagas } from './application/sagas/o-auth-refresh-token.sagas';

// command handlers
import { OAuthCreateRefreshTokenCommandHandler } from './application/create/o-auth-create-refresh-token.command-handler';
import { OAuthDeleteRefreshTokenByIdCommandHandler } from './application/delete/o-auth-delete-refresh-token-by-id.command-handler';
import { OAuthDeleteRefreshTokensCommandHandler } from './application/delete/o-auth-delete-refresh-tokens.command-handler';

// query handlers
import { OAuthFindRefreshTokenByIdQueryHandler } from './application/find/o-auth-find-refresh-token-by-id.query-handler';
import { OAuthFindRefreshTokenQueryHandler } from './application/find/o-auth-find-refresh-token.query-handler';
import { OAuthGetRefreshTokensQueryHandler } from './application/get/o-auth-get-refresh-tokens.query-handler';
import { OAuthPaginateRefreshTokensQueryHandler } from './application/paginate/o-auth-paginate-refresh-tokens.query-handler';

// event handlers
import { OAuthCreatedRefreshTokenEventHandler } from './application/events/o-auth-created-refresh-token.event-handler';
import { OAuthDeletedRefreshTokenEventHandler } from './application/events/o-auth-deleted-refresh-token.event-handler';
import { OAuthDeletedRefreshTokensEventHandler } from './application/events/o-auth-deleted-refresh-tokens.event-handler';

// services
import { OAuthCreateRefreshTokenService } from './application/create/o-auth-create-refresh-token.service';
import { OAuthDeleteRefreshTokenByIdService } from './application/delete/o-auth-delete-refresh-token-by-id.service';
import { OAuthDeleteRefreshTokensService } from './application/delete/o-auth-delete-refresh-tokens.service';
import { OAuthFindRefreshTokenByIdService } from './application/find/o-auth-find-refresh-token-by-id.service';
import { OAuthFindRefreshTokenService } from './application/find/o-auth-find-refresh-token.service';
import { OAuthGetRefreshTokensService } from './application/get/o-auth-get-refresh-tokens.service';
import { OAuthPaginateRefreshTokensService } from './application/paginate/o-auth-paginate-refresh-tokens.service';

export const OAuthRefreshTokenHandlers = [
    // commands
    OAuthCreateRefreshTokenCommandHandler,
    OAuthDeleteRefreshTokenByIdCommandHandler,
    OAuthDeleteRefreshTokensCommandHandler,

    // queries
    OAuthPaginateRefreshTokensQueryHandler,
    OAuthGetRefreshTokensQueryHandler,
    OAuthFindRefreshTokenQueryHandler,
    OAuthFindRefreshTokenByIdQueryHandler,

    // events
    OAuthCreatedRefreshTokenEventHandler,
    OAuthDeletedRefreshTokenEventHandler,
    OAuthDeletedRefreshTokensEventHandler,
];

export const OAuthRefreshTokenServices = [
    OAuthCreateRefreshTokenService,
    OAuthPaginateRefreshTokensService,
    OAuthGetRefreshTokensService,
    OAuthFindRefreshTokenService,
    OAuthFindRefreshTokenByIdService,
    OAuthDeleteRefreshTokenByIdService,
    OAuthDeleteRefreshTokensService,
];
