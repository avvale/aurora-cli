// commands
import { CreateRefreshTokenCommandHandler } from './application/create/create-refresh-token.command-handler';
import { DeleteRefreshTokenByIdCommandHandler } from './application/delete/delete-refresh-token-by-id.command-handler';
import { DeleteRefreshTokensCommandHandler } from './application/delete/delete-refresh-tokens.command-handler';

// queries
import { PaginateRefreshTokensQueryHandler } from './application/paginate/paginate-refresh-tokens.query-handler';
import { GetRefreshTokensQueryHandler } from './application/get/get-refresh-tokens.query-handler';
import { FindRefreshTokenQueryHandler } from './application/find/find-refresh-token.query-handler';
import { FindRefreshTokenByIdQueryHandler } from './application/find/find-refresh-token-by-id.query-handler';
import { RawSQLRefreshTokensQueryHandler } from './application/raw-sql/raw-sql-refresh-tokens.query-handler';

// events
import { CreatedRefreshTokenEventHandler } from './application/events/created-refresh-token.event-handler';
import { DeletedRefreshTokenEventHandler } from './application/events/deleted-refresh-token.event-handler';
import { DeletedRefreshTokensEventHandler } from './application/events/deleted-refresh-tokens.event-handler';

// services
import { CreateRefreshTokenService } from './application/create/create-refresh-token.service';
import { PaginateRefreshTokensService } from './application/paginate/paginate-refresh-tokens.service';
import { GetRefreshTokensService } from './application/get/get-refresh-tokens.service';
import { FindRefreshTokenService } from './application/find/find-refresh-token.service';
import { FindRefreshTokenByIdService } from './application/find/find-refresh-token-by-id.service';
import { RawSQLRefreshTokensService } from './application/raw-sql/raw-sql-refresh-tokens.service';
import { DeleteRefreshTokenByIdService } from './application/delete/delete-refresh-token-by-id.service';
import { DeleteRefreshTokensService } from './application/delete/delete-refresh-tokens.service';

// models
export { OAuthRefreshTokenModel } from './infrastructure/sequelize/sequelize-refresh-token.model';

// repository
export { IRefreshTokenRepository } from './domain/refresh-token.repository';
export { SequelizeRefreshTokenRepository } from './infrastructure/sequelize/sequelize-refresh-token.repository';

// sagas
export { RefreshTokenSagas } from './application/sagas/refresh-token.sagas';

export const OAuthRefreshTokenHandlers = [
    // commands
    CreateRefreshTokenCommandHandler,
    DeleteRefreshTokenByIdCommandHandler,
    DeleteRefreshTokensCommandHandler,

    // queries
    PaginateRefreshTokensQueryHandler,
    GetRefreshTokensQueryHandler,
    FindRefreshTokenQueryHandler,
    FindRefreshTokenByIdQueryHandler,
    RawSQLRefreshTokensQueryHandler,

    // events
    CreatedRefreshTokenEventHandler,
    DeletedRefreshTokenEventHandler,
    DeletedRefreshTokensEventHandler,
];

export const OAuthRefreshTokenServices = [
    CreateRefreshTokenService,
    PaginateRefreshTokensService,
    GetRefreshTokensService,
    FindRefreshTokenService,
    FindRefreshTokenByIdService,
    RawSQLRefreshTokensService,
    DeleteRefreshTokenByIdService,
    DeleteRefreshTokensService,
];