// commands
import { CreateAccessTokenCommandHandler } from './application/create/create-access-token.command-handler';
import { CreateAccessTokensCommandHandler } from './application/create/create-access-tokens.command-handler';
import { UpdateAccessTokenCommandHandler } from './application/update/update-access-token.command-handler';
import { DeleteAccessTokenByIdCommandHandler } from './application/delete/delete-access-token-by-id.command-handler';
import { DeleteAccessTokensCommandHandler } from './application/delete/delete-access-tokens.command-handler';

// queries
import { PaginateAccessTokensQueryHandler } from './application/paginate/paginate-access-tokens.query-handler';
import { GetAccessTokensQueryHandler } from './application/get/get-access-tokens.query-handler';
import { FindAccessTokenQueryHandler } from './application/find/find-access-token.query-handler';
import { FindAccessTokenByIdQueryHandler } from './application/find/find-access-token-by-id.query-handler';

// events
import { CreatedAccessTokenEventHandler } from './application/events/created-access-token.event-handler';
import { CreatedAccessTokensEventHandler } from './application/events/created-access-tokens.event-handler';
import { UpdatedAccessTokenEventHandler } from './application/events/updated-access-token.event-handler';
import { DeletedAccessTokenEventHandler } from './application/events/deleted-access-token.event-handler';
import { DeletedAccessTokensEventHandler } from './application/events/deleted-access-tokens.event-handler';

// services
import { CreateAccessTokenService } from './application/create/create-access-token.service';
import { CreateAccessTokensService } from './application/create/create-access-tokens.service';
import { PaginateAccessTokensService } from './application/paginate/paginate-access-tokens.service';
import { GetAccessTokensService } from './application/get/get-access-tokens.service';
import { FindAccessTokenService } from './application/find/find-access-token.service';
import { FindAccessTokenByIdService } from './application/find/find-access-token-by-id.service';
import { UpdateAccessTokenService } from './application/update/update-access-token.service';
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
    CreateAccessTokensCommandHandler,
    UpdateAccessTokenCommandHandler,
    DeleteAccessTokenByIdCommandHandler,
    DeleteAccessTokensCommandHandler,

    // queries
    PaginateAccessTokensQueryHandler,
    GetAccessTokensQueryHandler,
    FindAccessTokenQueryHandler,
    FindAccessTokenByIdQueryHandler,

    // events
    CreatedAccessTokenEventHandler,
    CreatedAccessTokensEventHandler,
    UpdatedAccessTokenEventHandler,
    DeletedAccessTokenEventHandler,
    DeletedAccessTokensEventHandler,
];

export const OAuthAccessTokenServices = [
    CreateAccessTokenService,
    CreateAccessTokensService,
    PaginateAccessTokensService,
    GetAccessTokensService,
    FindAccessTokenService,
    FindAccessTokenByIdService,
    UpdateAccessTokenService,
    DeleteAccessTokenByIdService,
    DeleteAccessTokensService,
];