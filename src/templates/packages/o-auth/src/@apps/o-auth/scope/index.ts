// commands
import { CreateScopeCommandHandler } from './application/create/create-scope.command-handler';
import { CreateScopesCommandHandler } from './application/create/create-scopes.command-handler';
import { UpdateScopeCommandHandler } from './application/update/update-scope.command-handler';
import { DeleteScopeByIdCommandHandler } from './application/delete/delete-scope-by-id.command-handler';
import { DeleteScopesCommandHandler } from './application/delete/delete-scopes.command-handler';

// queries
import { PaginateScopesQueryHandler } from './application/paginate/paginate-scopes.query-handler';
import { GetScopesQueryHandler } from './application/get/get-scopes.query-handler';
import { FindScopeQueryHandler } from './application/find/find-scope.query-handler';
import { FindScopeByIdQueryHandler } from './application/find/find-scope-by-id.query-handler';

// events
import { CreatedScopeEventHandler } from './application/events/created-scope.event-handler';
import { CreatedScopesEventHandler } from './application/events/created-scopes.event-handler';
import { UpdatedScopeEventHandler } from './application/events/updated-scope.event-handler';
import { DeletedScopeEventHandler } from './application/events/deleted-scope.event-handler';
import { DeletedScopesEventHandler } from './application/events/deleted-scopes.event-handler';

// services
import { CreateScopeService } from './application/create/create-scope.service';
import { CreateScopesService } from './application/create/create-scopes.service';
import { PaginateScopesService } from './application/paginate/paginate-scopes.service';
import { GetScopesService } from './application/get/get-scopes.service';
import { FindScopeService } from './application/find/find-scope.service';
import { FindScopeByIdService } from './application/find/find-scope-by-id.service';
import { UpdateScopeService } from './application/update/update-scope.service';
import { DeleteScopeByIdService } from './application/delete/delete-scope-by-id.service';
import { DeleteScopesService } from './application/delete/delete-scopes.service';

// models
export { OAuthScopeModel } from './infrastructure/sequelize/sequelize-scope.model';

// repository
export { IScopeRepository } from './domain/scope.repository';
export { SequelizeScopeRepository } from './infrastructure/sequelize/sequelize-scope.repository';

// sagas
export { ScopeSagas } from './application/sagas/scope.sagas';

export const OAuthScopeHandlers = [
    // commands
    CreateScopeCommandHandler,
    CreateScopesCommandHandler,
    UpdateScopeCommandHandler,
    DeleteScopeByIdCommandHandler,
    DeleteScopesCommandHandler,

    // queries
    PaginateScopesQueryHandler,
    GetScopesQueryHandler,
    FindScopeQueryHandler,
    FindScopeByIdQueryHandler,

    // events
    CreatedScopeEventHandler,
    CreatedScopesEventHandler,
    UpdatedScopeEventHandler,
    DeletedScopeEventHandler,
    DeletedScopesEventHandler,
];

export const OAuthScopeServices = [
    CreateScopeService,
    CreateScopesService,
    PaginateScopesService,
    GetScopesService,
    FindScopeService,
    FindScopeByIdService,
    UpdateScopeService,
    DeleteScopeByIdService,
    DeleteScopesService,
];