// export commands
export { OAuthCreateClientCommand } from './application/create/o-auth-create-client.command';
export { OAuthCreateClientsCommand } from './application/create/o-auth-create-clients.command';
export { OAuthDeleteClientByIdCommand } from './application/delete/o-auth-delete-client-by-id.command';
export { OAuthDeleteClientsCommand } from './application/delete/o-auth-delete-clients.command';
export { OAuthUpdateClientByIdCommand } from './application/update/o-auth-update-client-by-id.command';

// export queries
export { OAuthFindClientByIdQuery } from './application/find/o-auth-find-client-by-id.query';
export { OAuthFindClientQuery } from './application/find/o-auth-find-client.query';
export { OAuthGetClientsQuery } from './application/get/o-auth-get-clients.query';
export { OAuthPaginateClientsQuery } from './application/paginate/o-auth-paginate-clients.query';

// export mocks
export { oAuthMockClientData } from './infrastructure/mock/o-auth-mock-client.data';
export { OAuthMockClientRepository } from './infrastructure/mock/o-auth-mock-client.repository';
export { OAuthMockClientSeeder } from './infrastructure/mock/o-auth-mock-client.seeder';

// export events
export { OAuthAddClientsContextEvent } from './application/events/o-auth-add-clients-context.event';
export { OAuthCreatedClientEvent } from './application/events/o-auth-created-client.event';
export { OAuthCreatedClientsEvent } from './application/events/o-auth-created-clients.event';
export { OAuthDeletedClientEvent } from './application/events/o-auth-deleted-client.event';
export { OAuthDeletedClientsEvent } from './application/events/o-auth-deleted-clients.event';
export { OAuthUpdatedClientEvent } from './application/events/o-auth-updated-client.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { OAuthClient } from './domain/o-auth-client.aggregate';
export { OAuthClientMapper } from './domain/o-auth-client.mapper';
export { OAuthIClientRepository } from './domain/o-auth-client.repository';
export { OAuthClientResponse } from './domain/o-auth-client.response';

// infrastructure
export { OAuthClientModel } from './infrastructure/sequelize/o-auth-sequelize-client.model';
export { OAuthSequelizeClientRepository } from './infrastructure/sequelize/o-auth-sequelize-client.repository';

// sagas
export { OAuthClientSagas } from './application/sagas/o-auth-client.sagas';

// command handlers
import { OAuthCreateClientCommandHandler } from './application/create/o-auth-create-client.command-handler';
import { OAuthCreateClientsCommandHandler } from './application/create/o-auth-create-clients.command-handler';
import { OAuthDeleteClientByIdCommandHandler } from './application/delete/o-auth-delete-client-by-id.command-handler';
import { OAuthDeleteClientsCommandHandler } from './application/delete/o-auth-delete-clients.command-handler';
import { OAuthUpdateClientByIdCommandHandler } from './application/update/o-auth-update-client-by-id.command-handler';

// query handlers
import { OAuthFindClientByIdQueryHandler } from './application/find/o-auth-find-client-by-id.query-handler';
import { OAuthFindClientQueryHandler } from './application/find/o-auth-find-client.query-handler';
import { OAuthGetClientsQueryHandler } from './application/get/o-auth-get-clients.query-handler';
import { OAuthPaginateClientsQueryHandler } from './application/paginate/o-auth-paginate-clients.query-handler';

// event handlers
import { OAuthCreatedClientEventHandler } from './application/events/o-auth-created-client.event-handler';
import { OAuthCreatedClientsEventHandler } from './application/events/o-auth-created-clients.event-handler';
import { OAuthDeletedClientEventHandler } from './application/events/o-auth-deleted-client.event-handler';
import { OAuthDeletedClientsEventHandler } from './application/events/o-auth-deleted-clients.event-handler';
import { OAuthUpdatedClientEventHandler } from './application/events/o-auth-updated-client.event-handler';

// services
import { OAuthCreateClientService } from './application/create/o-auth-create-client.service';
import { OAuthCreateClientsService } from './application/create/o-auth-create-clients.service';
import { OAuthDeleteClientByIdService } from './application/delete/o-auth-delete-client-by-id.service';
import { OAuthDeleteClientsService } from './application/delete/o-auth-delete-clients.service';
import { OAuthFindClientByIdService } from './application/find/o-auth-find-client-by-id.service';
import { OAuthFindClientService } from './application/find/o-auth-find-client.service';
import { OAuthGetClientsService } from './application/get/o-auth-get-clients.service';
import { OAuthPaginateClientsService } from './application/paginate/o-auth-paginate-clients.service';
import { OAuthUpdateClientByIdService } from './application/update/o-auth-update-client-by-id.service';

export const OAuthClientHandlers = [
  // commands
  OAuthCreateClientCommandHandler,
  OAuthCreateClientsCommandHandler,
  OAuthUpdateClientByIdCommandHandler,
  OAuthDeleteClientByIdCommandHandler,
  OAuthDeleteClientsCommandHandler,

  // queries
  OAuthPaginateClientsQueryHandler,
  OAuthGetClientsQueryHandler,
  OAuthFindClientQueryHandler,
  OAuthFindClientByIdQueryHandler,

  // events
  OAuthCreatedClientEventHandler,
  OAuthCreatedClientsEventHandler,
  OAuthUpdatedClientEventHandler,
  OAuthDeletedClientEventHandler,
  OAuthDeletedClientsEventHandler,
];

export const OAuthClientServices = [
  OAuthCreateClientService,
  OAuthCreateClientsService,
  OAuthPaginateClientsService,
  OAuthGetClientsService,
  OAuthFindClientService,
  OAuthFindClientByIdService,
  OAuthUpdateClientByIdService,
  OAuthDeleteClientByIdService,
  OAuthDeleteClientsService,
];
