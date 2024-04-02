// export commands
export { OAuthCreateAccessTokenCommand } from './application/create/o-auth-create-access-token.command';
export { OAuthUpdateAndIncrementAccessTokensCommand } from './application/update/o-auth-update-and-increment-access-tokens.command';
export { OAuthDeleteAccessTokenByIdCommand } from './application/delete/o-auth-delete-access-token-by-id.command';
export { OAuthDeleteAccessTokensCommand } from './application/delete/o-auth-delete-access-tokens.command';

// export queries
export { OAuthPaginateAccessTokensQuery } from './application/paginate/o-auth-paginate-access-tokens.query';
export { OAuthGetAccessTokensQuery } from './application/get/o-auth-get-access-tokens.query';
export { OAuthFindAccessTokenQuery } from './application/find/o-auth-find-access-token.query';
export { OAuthFindAccessTokenByIdQuery } from './application/find/o-auth-find-access-token-by-id.query';
export { OAuthRawSQLAccessTokensQuery } from './application/raw-sql/o-auth-raw-sql-access-tokens.query';
export { OAuthCountAccessTokenQuery } from './application/count/o-auth-count-access-token.query';
export { OAuthMaxAccessTokenQuery } from './application/max/o-auth-max-access-token.query';
export { OAuthMinAccessTokenQuery } from './application/min/o-auth-min-access-token.query';
export { OAuthSumAccessTokenQuery } from './application/sum/o-auth-sum-access-token.query';

// export mocks
export { oAuthMockAccessTokenData } from './infrastructure/mock/o-auth-mock-access-token.data';
export { OAuthMockAccessTokenSeeder } from './infrastructure/mock/o-auth-mock-access-token.seeder';
export { OAuthMockAccessTokenRepository } from './infrastructure/mock/o-auth-mock-access-token.repository';

// export events
export { OAuthAddAccessTokensContextEvent } from './application/events/o-auth-add-access-tokens-context.event';
export { OAuthCreatedAccessTokenEvent } from './application/events/o-auth-created-access-token.event';
export { OAuthDeletedAccessTokensEvent } from './application/events/o-auth-deleted-access-tokens.event';
export { OAuthDeletedAccessTokenEvent } from './application/events/o-auth-deleted-access-token.event';
export { OAuthUpdatedAndIncrementedAccessTokensEvent } from './application/events/o-auth-updated-and-incremented-access-tokens.event';
export { OAuthUpdatedAndIncrementedAccessTokenEvent } from './application/events/o-auth-updated-and-incremented-access-token.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { OAuthAccessToken } from './domain/o-auth-access-token.aggregate';
export { OAuthAccessTokenMapper } from './domain/o-auth-access-token.mapper';
export { OAuthIAccessTokenRepository } from './domain/o-auth-access-token.repository';
export { OAuthAccessTokenResponse } from './domain/o-auth-access-token.response';

// infrastructure
export { OAuthAccessTokenModel } from './infrastructure/sequelize/o-auth-sequelize-access-token.model';
export { OAuthSequelizeAccessTokenRepository } from './infrastructure/sequelize/o-auth-sequelize-access-token.repository';

// sagas
export { OAuthAccessTokenSagas } from './application/sagas/o-auth-access-token.sagas';

// command handlers
import { OAuthCreateAccessTokenCommandHandler } from './application/create/o-auth-create-access-token.command-handler';
import { OAuthUpdateAndIncrementAccessTokensCommandHandler } from './application/update/o-auth-update-and-increment-access-tokens.command-handler';
import { OAuthDeleteAccessTokenByIdCommandHandler } from './application/delete/o-auth-delete-access-token-by-id.command-handler';
import { OAuthDeleteAccessTokensCommandHandler } from './application/delete/o-auth-delete-access-tokens.command-handler';

// query handlers
import { OAuthPaginateAccessTokensQueryHandler } from './application/paginate/o-auth-paginate-access-tokens.query-handler';
import { OAuthGetAccessTokensQueryHandler } from './application/get/o-auth-get-access-tokens.query-handler';
import { OAuthFindAccessTokenQueryHandler } from './application/find/o-auth-find-access-token.query-handler';
import { OAuthFindAccessTokenByIdQueryHandler } from './application/find/o-auth-find-access-token-by-id.query-handler';
import { OAuthRawSQLAccessTokensQueryHandler } from './application/raw-sql/o-auth-raw-sql-access-tokens.query-handler';
import { OAuthCountAccessTokenQueryHandler } from './application/count/o-auth-count-access-token.query-handler';
import { OAuthMaxAccessTokenQueryHandler } from './application/max/o-auth-max-access-token.query-handler';
import { OAuthMinAccessTokenQueryHandler } from './application/min/o-auth-min-access-token.query-handler';
import { OAuthSumAccessTokenQueryHandler } from './application/sum/o-auth-sum-access-token.query-handler';

// event handlers
import { OAuthCreatedAccessTokenEventHandler } from './application/events/o-auth-created-access-token.event-handler';
import { OAuthUpdatedAndIncrementedAccessTokensEventHandler } from './application/events/o-auth-updated-and-incremented-access-tokens.event-handler';
import { OAuthDeletedAccessTokenEventHandler } from './application/events/o-auth-deleted-access-token.event-handler';
import { OAuthDeletedAccessTokensEventHandler } from './application/events/o-auth-deleted-access-tokens.event-handler';

// services
import { OAuthCreateAccessTokenService } from './application/create/o-auth-create-access-token.service';
import { OAuthPaginateAccessTokensService } from './application/paginate/o-auth-paginate-access-tokens.service';
import { OAuthGetAccessTokensService } from './application/get/o-auth-get-access-tokens.service';
import { OAuthFindAccessTokenService } from './application/find/o-auth-find-access-token.service';
import { OAuthFindAccessTokenByIdService } from './application/find/o-auth-find-access-token-by-id.service';
import { OAuthRawSQLAccessTokensService } from './application/raw-sql/o-auth-raw-sql-access-tokens.service';
import { OAuthCountAccessTokenService } from './application/count/o-auth-count-access-token.service';
import { OAuthMaxAccessTokenService } from './application/max/o-auth-max-access-token.service';
import { OAuthMinAccessTokenService } from './application/min/o-auth-min-access-token.service';
import { OAuthSumAccessTokenService } from './application/sum/o-auth-sum-access-token.service';
import { OAuthUpdateAndIncrementAccessTokensService } from './application/update/o-auth-update-and-increment-access-tokens.service';
import { OAuthDeleteAccessTokenByIdService } from './application/delete/o-auth-delete-access-token-by-id.service';
import { OAuthDeleteAccessTokensService } from './application/delete/o-auth-delete-access-tokens.service';

export const OAuthAccessTokenHandlers = [
    // commands
    OAuthCreateAccessTokenCommandHandler,
    OAuthUpdateAndIncrementAccessTokensCommandHandler,
    OAuthDeleteAccessTokenByIdCommandHandler,
    OAuthDeleteAccessTokensCommandHandler,

    // queries
    OAuthPaginateAccessTokensQueryHandler,
    OAuthGetAccessTokensQueryHandler,
    OAuthFindAccessTokenQueryHandler,
    OAuthFindAccessTokenByIdQueryHandler,
    OAuthRawSQLAccessTokensQueryHandler,
    OAuthCountAccessTokenQueryHandler,
    OAuthMaxAccessTokenQueryHandler,
    OAuthMinAccessTokenQueryHandler,
    OAuthSumAccessTokenQueryHandler,

    // events
    OAuthCreatedAccessTokenEventHandler,
    OAuthUpdatedAndIncrementedAccessTokensEventHandler,
    OAuthDeletedAccessTokenEventHandler,
    OAuthDeletedAccessTokensEventHandler,
];

export const OAuthAccessTokenServices = [
    OAuthCreateAccessTokenService,
    OAuthPaginateAccessTokensService,
    OAuthGetAccessTokensService,
    OAuthFindAccessTokenService,
    OAuthFindAccessTokenByIdService,
    OAuthRawSQLAccessTokensService,
    OAuthCountAccessTokenService,
    OAuthMaxAccessTokenService,
    OAuthMinAccessTokenService,
    OAuthSumAccessTokenService,
    OAuthUpdateAndIncrementAccessTokensService,
    OAuthDeleteAccessTokenByIdService,
    OAuthDeleteAccessTokensService,
];