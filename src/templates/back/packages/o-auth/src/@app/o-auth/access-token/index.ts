// commands
import { CreateAccessTokenCommandHandler } from './application/create/create-access-token.command-handler';
import { DeleteAccessTokenByIdCommandHandler } from './application/delete/delete-access-token-by-id.command-handler';
import { DeleteAccessTokensCommandHandler } from './application/delete/delete-access-tokens.command-handler';

// queries
import { PaginateAccessTokensQueryHandler } from './application/paginate/paginate-access-tokens.query-handler';
import { GetAccessTokensQueryHandler } from './application/get/get-access-tokens.query-handler';
import { FindAccessTokenQueryHandler } from './application/find/find-access-token.query-handler';
import { FindAccessTokenByIdQueryHandler } from './application/find/find-access-token-by-id.query-handler';
import { RawSQLAccessTokensQueryHandler } from './application/raw-sql/raw-sql-access-tokens.query-handler';

// events
import { CreatedAccessTokenEventHandler } from './application/events/created-access-token.event-handler';
import { DeletedAccessTokenEventHandler } from './application/events/deleted-access-token.event-handler';
import { DeletedAccessTokensEventHandler } from './application/events/deleted-access-tokens.event-handler';

// services
import { CreateAccessTokenService } from './application/create/create-access-token.service';
import { PaginateAccessTokensService } from './application/paginate/paginate-access-tokens.service';
import { GetAccessTokensService } from './application/get/get-access-tokens.service';
import { FindAccessTokenService } from './application/find/find-access-token.service';
import { FindAccessTokenByIdService } from './application/find/find-access-token-by-id.service';
import { RawSQLAccessTokensService } from './application/raw-sql/raw-sql-access-tokens.service';
import { DeleteAccessTokenByIdService } from './application/delete/delete-access-token-by-id.service';
import { DeleteAccessTokensService } from './application/delete/delete-access-tokens.service';

// models
export { OAuthAccessTokenModel } from './infrastructure/sequelize/sequelize-access-token.model';

// repository
export { IAccessTokenRepository } from './domain/access-token.repository';
export { SequelizeAccessTokenRepository } from './infrastructure/sequelize/sequelize-access-token.repository';

// sagas
export { AccessTokenSagas } from './application/sagas/access-token.sagas';

export const OAuthAccessTokenHandlers = [
    // commands
    CreateAccessTokenCommandHandler,
    DeleteAccessTokenByIdCommandHandler,
    DeleteAccessTokensCommandHandler,

    // queries
    PaginateAccessTokensQueryHandler,
    GetAccessTokensQueryHandler,
    FindAccessTokenQueryHandler,
    FindAccessTokenByIdQueryHandler,
    RawSQLAccessTokensQueryHandler,

    // events
    CreatedAccessTokenEventHandler,
    DeletedAccessTokenEventHandler,
    DeletedAccessTokensEventHandler,
];

export const OAuthAccessTokenServices = [
    CreateAccessTokenService,
    PaginateAccessTokensService,
    GetAccessTokensService,
    FindAccessTokenService,
    FindAccessTokenByIdService,
    RawSQLAccessTokensService,
    DeleteAccessTokenByIdService,
    DeleteAccessTokensService,
];