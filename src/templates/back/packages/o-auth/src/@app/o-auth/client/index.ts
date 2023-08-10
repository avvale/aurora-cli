// export commands
export { OAuthCreateClientCommand } from './application/create/o-auth-create-client.command';
export { OAuthCreateClientsCommand } from './application/create/o-auth-create-clients.command';
export { OAuthUpdateClientByIdCommand } from './application/update/o-auth-update-client-by-id.command';
export { OAuthUpdateClientsCommand } from './application/update/o-auth-update-clients.command';
export { OAuthUpsertClientCommand } from './application/upsert/o-auth-upsert-client.command';
export { OAuthDeleteClientByIdCommand } from './application/delete/o-auth-delete-client-by-id.command';
export { OAuthDeleteClientsCommand } from './application/delete/o-auth-delete-clients.command';

// export queries
export { OAuthPaginateClientsQuery } from './application/paginate/o-auth-paginate-clients.query';
export { OAuthGetClientsQuery } from './application/get/o-auth-get-clients.query';
export { OAuthFindClientQuery } from './application/find/o-auth-find-client.query';
export { OAuthFindClientByIdQuery } from './application/find/o-auth-find-client-by-id.query';
export { OAuthRawSQLClientsQuery } from './application/raw-sql/o-auth-raw-sql-clients.query';

// export mocks
export { oAuthMockClientData } from './infrastructure/mock/o-auth-mock-client.data';
export { OAuthMockClientSeeder } from './infrastructure/mock/o-auth-mock-client.seeder';
export { OAuthMockClientRepository } from './infrastructure/mock/o-auth-mock-client.repository';

// export events
export { OAuthAddClientsContextEvent } from './application/events/o-auth-add-clients-context.event';
export { OAuthCreatedClientsEvent } from './application/events/o-auth-created-clients.event';
export { OAuthCreatedClientEvent } from './application/events/o-auth-created-client.event';
export { OAuthDeletedClientsEvent } from './application/events/o-auth-deleted-clients.event';
export { OAuthDeletedClientEvent } from './application/events/o-auth-deleted-client.event';
export { OAuthUpdatedClientsEvent } from './application/events/o-auth-updated-clients.event';
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
import { OAuthUpdateClientByIdCommandHandler } from './application/update/o-auth-update-client-by-id.command-handler';
import { OAuthUpdateClientsCommandHandler } from './application/update/o-auth-update-clients.command-handler';
import { OAuthUpsertClientCommandHandler } from './application/upsert/o-auth-upsert-client.command-handler';
import { OAuthDeleteClientByIdCommandHandler } from './application/delete/o-auth-delete-client-by-id.command-handler';
import { OAuthDeleteClientsCommandHandler } from './application/delete/o-auth-delete-clients.command-handler';

// query handlers
import { OAuthPaginateClientsQueryHandler } from './application/paginate/o-auth-paginate-clients.query-handler';
import { OAuthGetClientsQueryHandler } from './application/get/o-auth-get-clients.query-handler';
import { OAuthFindClientQueryHandler } from './application/find/o-auth-find-client.query-handler';
import { OAuthFindClientByIdQueryHandler } from './application/find/o-auth-find-client-by-id.query-handler';
import { OAuthRawSQLClientsQueryHandler } from './application/raw-sql/o-auth-raw-sql-clients.query-handler';

// event handlers
import { OAuthCreatedClientEventHandler } from './application/events/o-auth-created-client.event-handler';
import { OAuthCreatedClientsEventHandler } from './application/events/o-auth-created-clients.event-handler';
import { OAuthUpdatedClientEventHandler } from './application/events/o-auth-updated-client.event-handler';
import { OAuthUpdatedClientsEventHandler } from './application/events/o-auth-updated-clients.event-handler';
import { OAuthDeletedClientEventHandler } from './application/events/o-auth-deleted-client.event-handler';
import { OAuthDeletedClientsEventHandler } from './application/events/o-auth-deleted-clients.event-handler';

// services
import { OAuthCreateClientService } from './application/create/o-auth-create-client.service';
import { OAuthCreateClientsService } from './application/create/o-auth-create-clients.service';
import { OAuthPaginateClientsService } from './application/paginate/o-auth-paginate-clients.service';
import { OAuthGetClientsService } from './application/get/o-auth-get-clients.service';
import { OAuthFindClientService } from './application/find/o-auth-find-client.service';
import { OAuthFindClientByIdService } from './application/find/o-auth-find-client-by-id.service';
import { OAuthRawSQLClientsService } from './application/raw-sql/o-auth-raw-sql-clients.service';
import { OAuthUpdateClientByIdService } from './application/update/o-auth-update-client-by-id.service';
import { OAuthUpdateClientsService } from './application/update/o-auth-update-clients.service';
import { OAuthUpsertClientService } from './application/upsert/o-auth-upsert-client.service';
import { OAuthDeleteClientByIdService } from './application/delete/o-auth-delete-client-by-id.service';
import { OAuthDeleteClientsService } from './application/delete/o-auth-delete-clients.service';

export const OAuthClientHandlers = [
    // commands
    OAuthCreateClientCommandHandler,
    OAuthCreateClientsCommandHandler,
    OAuthUpdateClientByIdCommandHandler,
    OAuthUpdateClientsCommandHandler,
    OAuthUpsertClientCommandHandler,
    OAuthDeleteClientByIdCommandHandler,
    OAuthDeleteClientsCommandHandler,

    // queries
    OAuthPaginateClientsQueryHandler,
    OAuthGetClientsQueryHandler,
    OAuthFindClientQueryHandler,
    OAuthFindClientByIdQueryHandler,
    OAuthRawSQLClientsQueryHandler,

    // events
    OAuthCreatedClientEventHandler,
    OAuthCreatedClientsEventHandler,
    OAuthUpdatedClientEventHandler,
    OAuthUpdatedClientsEventHandler,
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
    OAuthRawSQLClientsService,
    OAuthUpdateClientByIdService,
    OAuthUpdateClientsService,
    OAuthUpsertClientService,
    OAuthDeleteClientByIdService,
    OAuthDeleteClientsService,
];