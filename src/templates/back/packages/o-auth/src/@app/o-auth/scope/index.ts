// export commands
export { OAuthCreateScopeCommand } from './application/create/o-auth-create-scope.command';
export { OAuthDeleteScopeByIdCommand } from './application/delete/o-auth-delete-scope-by-id.command';
export { OAuthDeleteScopesCommand } from './application/delete/o-auth-delete-scopes.command';
export { OAuthUpdateScopeByIdCommand } from './application/update/o-auth-update-scope-by-id.command';

// export queries
export { OAuthFindScopeByIdQuery } from './application/find/o-auth-find-scope-by-id.query';
export { OAuthFindScopeQuery } from './application/find/o-auth-find-scope.query';
export { OAuthGetScopesQuery } from './application/get/o-auth-get-scopes.query';
export { OAuthPaginateScopesQuery } from './application/paginate/o-auth-paginate-scopes.query';

// export mocks
export { oAuthMockScopeData } from './infrastructure/mock/o-auth-mock-scope.data';
export { OAuthMockScopeRepository } from './infrastructure/mock/o-auth-mock-scope.repository';
export { OAuthMockScopeSeeder } from './infrastructure/mock/o-auth-mock-scope.seeder';

// export events
export { OAuthAddScopesContextEvent } from './application/events/o-auth-add-scopes-context.event';
export { OAuthCreatedScopeEvent } from './application/events/o-auth-created-scope.event';
export { OAuthCreatedScopesEvent } from './application/events/o-auth-created-scopes.event';
export { OAuthDeletedScopeEvent } from './application/events/o-auth-deleted-scope.event';
export { OAuthDeletedScopesEvent } from './application/events/o-auth-deleted-scopes.event';
export { OAuthUpdatedScopeEvent } from './application/events/o-auth-updated-scope.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { OAuthScope } from './domain/o-auth-scope.aggregate';
export { OAuthScopeMapper } from './domain/o-auth-scope.mapper';
export { OAuthIScopeRepository } from './domain/o-auth-scope.repository';
export { OAuthScopeResponse } from './domain/o-auth-scope.response';

// infrastructure
export { OAuthScopeModel } from './infrastructure/sequelize/o-auth-sequelize-scope.model';
export { OAuthSequelizeScopeRepository } from './infrastructure/sequelize/o-auth-sequelize-scope.repository';

// sagas
export { OAuthScopeSagas } from './application/sagas/o-auth-scope.sagas';

// command handlers
import { OAuthCreateScopeCommandHandler } from './application/create/o-auth-create-scope.command-handler';
import { OAuthDeleteScopeByIdCommandHandler } from './application/delete/o-auth-delete-scope-by-id.command-handler';
import { OAuthDeleteScopesCommandHandler } from './application/delete/o-auth-delete-scopes.command-handler';
import { OAuthUpdateScopeByIdCommandHandler } from './application/update/o-auth-update-scope-by-id.command-handler';

// query handlers
import { OAuthFindScopeByIdQueryHandler } from './application/find/o-auth-find-scope-by-id.query-handler';
import { OAuthFindScopeQueryHandler } from './application/find/o-auth-find-scope.query-handler';
import { OAuthGetScopesQueryHandler } from './application/get/o-auth-get-scopes.query-handler';
import { OAuthPaginateScopesQueryHandler } from './application/paginate/o-auth-paginate-scopes.query-handler';

// event handlers
import { OAuthCreatedScopeEventHandler } from './application/events/o-auth-created-scope.event-handler';
import { OAuthCreatedScopesEventHandler } from './application/events/o-auth-created-scopes.event-handler';
import { OAuthDeletedScopeEventHandler } from './application/events/o-auth-deleted-scope.event-handler';
import { OAuthDeletedScopesEventHandler } from './application/events/o-auth-deleted-scopes.event-handler';
import { OAuthUpdatedScopeEventHandler } from './application/events/o-auth-updated-scope.event-handler';

// services
import { OAuthCreateScopeService } from './application/create/o-auth-create-scope.service';
import { OAuthDeleteScopeByIdService } from './application/delete/o-auth-delete-scope-by-id.service';
import { OAuthDeleteScopesService } from './application/delete/o-auth-delete-scopes.service';
import { OAuthFindScopeByIdService } from './application/find/o-auth-find-scope-by-id.service';
import { OAuthFindScopeService } from './application/find/o-auth-find-scope.service';
import { OAuthGetScopesService } from './application/get/o-auth-get-scopes.service';
import { OAuthPaginateScopesService } from './application/paginate/o-auth-paginate-scopes.service';
import { OAuthUpdateScopeByIdService } from './application/update/o-auth-update-scope-by-id.service';

export const OAuthScopeHandlers = [
  // commands
  OAuthCreateScopeCommandHandler,
  OAuthUpdateScopeByIdCommandHandler,
  OAuthDeleteScopeByIdCommandHandler,
  OAuthDeleteScopesCommandHandler,

  // queries
  OAuthPaginateScopesQueryHandler,
  OAuthGetScopesQueryHandler,
  OAuthFindScopeQueryHandler,
  OAuthFindScopeByIdQueryHandler,

  // events
  OAuthCreatedScopeEventHandler,
  OAuthCreatedScopesEventHandler,
  OAuthUpdatedScopeEventHandler,
  OAuthDeletedScopeEventHandler,
  OAuthDeletedScopesEventHandler,
];

export const OAuthScopeServices = [
  OAuthCreateScopeService,
  OAuthPaginateScopesService,
  OAuthGetScopesService,
  OAuthFindScopeService,
  OAuthFindScopeByIdService,
  OAuthUpdateScopeByIdService,
  OAuthDeleteScopeByIdService,
  OAuthDeleteScopesService,
];
