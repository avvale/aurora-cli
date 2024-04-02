// export commands
export { OAuthCreateApplicationClientCommand } from './application/create/o-auth-create-application-client.command';
export { OAuthCreateApplicationsClientsCommand } from './application/create/o-auth-create-applications-clients.command';
export { OAuthUpdateApplicationClientByIdCommand } from './application/update/o-auth-update-application-client-by-id.command';
export { OAuthUpdateApplicationsClientsCommand } from './application/update/o-auth-update-applications-clients.command';
export { OAuthUpdateAndIncrementApplicationsClientsCommand } from './application/update/o-auth-update-and-increment-applications-clients.command';
export { OAuthUpsertApplicationClientCommand } from './application/upsert/o-auth-upsert-application-client.command';
export { OAuthDeleteApplicationClientByIdCommand } from './application/delete/o-auth-delete-application-client-by-id.command';
export { OAuthDeleteApplicationsClientsCommand } from './application/delete/o-auth-delete-applications-clients.command';

// export queries
export { OAuthPaginateApplicationsClientsQuery } from './application/paginate/o-auth-paginate-applications-clients.query';
export { OAuthGetApplicationsClientsQuery } from './application/get/o-auth-get-applications-clients.query';
export { OAuthFindApplicationClientQuery } from './application/find/o-auth-find-application-client.query';
export { OAuthFindApplicationClientByIdQuery } from './application/find/o-auth-find-application-client-by-id.query';
export { OAuthRawSQLApplicationsClientsQuery } from './application/raw-sql/o-auth-raw-sql-applications-clients.query';
export { OAuthCountApplicationClientQuery } from './application/count/o-auth-count-application-client.query';
export { OAuthMaxApplicationClientQuery } from './application/max/o-auth-max-application-client.query';
export { OAuthMinApplicationClientQuery } from './application/min/o-auth-min-application-client.query';
export { OAuthSumApplicationClientQuery } from './application/sum/o-auth-sum-application-client.query';

// export mocks
export { oAuthMockApplicationClientData } from './infrastructure/mock/o-auth-mock-application-client.data';
export { OAuthMockApplicationClientSeeder } from './infrastructure/mock/o-auth-mock-application-client.seeder';
export { OAuthMockApplicationClientRepository } from './infrastructure/mock/o-auth-mock-application-client.repository';

// export events
export { OAuthAddApplicationsClientsContextEvent } from './application/events/o-auth-add-applications-clients-context.event';
export { OAuthCreatedApplicationsClientsEvent } from './application/events/o-auth-created-applications-clients.event';
export { OAuthCreatedApplicationClientEvent } from './application/events/o-auth-created-application-client.event';
export { OAuthDeletedApplicationsClientsEvent } from './application/events/o-auth-deleted-applications-clients.event';
export { OAuthDeletedApplicationClientEvent } from './application/events/o-auth-deleted-application-client.event';
export { OAuthUpdatedApplicationsClientsEvent } from './application/events/o-auth-updated-applications-clients.event';
export { OAuthUpdatedApplicationClientEvent } from './application/events/o-auth-updated-application-client.event';
export { OAuthUpdatedAndIncrementedApplicationsClientsEvent } from './application/events/o-auth-updated-and-incremented-applications-clients.event';
export { OAuthUpdatedAndIncrementedApplicationClientEvent } from './application/events/o-auth-updated-and-incremented-application-client.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { OAuthApplicationClient } from './domain/o-auth-application-client.aggregate';
export { OAuthApplicationClientMapper } from './domain/o-auth-application-client.mapper';
export { OAuthIApplicationClientRepository } from './domain/o-auth-application-client.repository';
export { OAuthApplicationClientResponse } from './domain/o-auth-application-client.response';

// infrastructure
export { OAuthApplicationClientModel } from './infrastructure/sequelize/o-auth-sequelize-application-client.model';
export { OAuthSequelizeApplicationClientRepository } from './infrastructure/sequelize/o-auth-sequelize-application-client.repository';

// sagas
export { OAuthApplicationClientSagas } from './application/sagas/o-auth-application-client.sagas';

// command handlers
import { OAuthCreateApplicationClientCommandHandler } from './application/create/o-auth-create-application-client.command-handler';
import { OAuthCreateApplicationsClientsCommandHandler } from './application/create/o-auth-create-applications-clients.command-handler';
import { OAuthUpdateApplicationClientByIdCommandHandler } from './application/update/o-auth-update-application-client-by-id.command-handler';
import { OAuthUpdateApplicationsClientsCommandHandler } from './application/update/o-auth-update-applications-clients.command-handler';
import { OAuthUpdateAndIncrementApplicationsClientsCommandHandler } from './application/update/o-auth-update-and-increment-applications-clients.command-handler';
import { OAuthUpsertApplicationClientCommandHandler } from './application/upsert/o-auth-upsert-application-client.command-handler';
import { OAuthDeleteApplicationClientByIdCommandHandler } from './application/delete/o-auth-delete-application-client-by-id.command-handler';
import { OAuthDeleteApplicationsClientsCommandHandler } from './application/delete/o-auth-delete-applications-clients.command-handler';

// query handlers
import { OAuthPaginateApplicationsClientsQueryHandler } from './application/paginate/o-auth-paginate-applications-clients.query-handler';
import { OAuthGetApplicationsClientsQueryHandler } from './application/get/o-auth-get-applications-clients.query-handler';
import { OAuthFindApplicationClientQueryHandler } from './application/find/o-auth-find-application-client.query-handler';
import { OAuthFindApplicationClientByIdQueryHandler } from './application/find/o-auth-find-application-client-by-id.query-handler';
import { OAuthRawSQLApplicationsClientsQueryHandler } from './application/raw-sql/o-auth-raw-sql-applications-clients.query-handler';
import { OAuthCountApplicationClientQueryHandler } from './application/count/o-auth-count-application-client.query-handler';
import { OAuthMaxApplicationClientQueryHandler } from './application/max/o-auth-max-application-client.query-handler';
import { OAuthMinApplicationClientQueryHandler } from './application/min/o-auth-min-application-client.query-handler';
import { OAuthSumApplicationClientQueryHandler } from './application/sum/o-auth-sum-application-client.query-handler';

// event handlers
import { OAuthCreatedApplicationClientEventHandler } from './application/events/o-auth-created-application-client.event-handler';
import { OAuthCreatedApplicationsClientsEventHandler } from './application/events/o-auth-created-applications-clients.event-handler';
import { OAuthUpdatedApplicationClientEventHandler } from './application/events/o-auth-updated-application-client.event-handler';
import { OAuthUpdatedApplicationsClientsEventHandler } from './application/events/o-auth-updated-applications-clients.event-handler';
import { OAuthUpdatedAndIncrementedApplicationsClientsEventHandler } from './application/events/o-auth-updated-and-incremented-applications-clients.event-handler';
import { OAuthDeletedApplicationClientEventHandler } from './application/events/o-auth-deleted-application-client.event-handler';
import { OAuthDeletedApplicationsClientsEventHandler } from './application/events/o-auth-deleted-applications-clients.event-handler';

// services
import { OAuthCreateApplicationClientService } from './application/create/o-auth-create-application-client.service';
import { OAuthCreateApplicationsClientsService } from './application/create/o-auth-create-applications-clients.service';
import { OAuthPaginateApplicationsClientsService } from './application/paginate/o-auth-paginate-applications-clients.service';
import { OAuthGetApplicationsClientsService } from './application/get/o-auth-get-applications-clients.service';
import { OAuthFindApplicationClientService } from './application/find/o-auth-find-application-client.service';
import { OAuthFindApplicationClientByIdService } from './application/find/o-auth-find-application-client-by-id.service';
import { OAuthRawSQLApplicationsClientsService } from './application/raw-sql/o-auth-raw-sql-applications-clients.service';
import { OAuthCountApplicationClientService } from './application/count/o-auth-count-application-client.service';
import { OAuthMaxApplicationClientService } from './application/max/o-auth-max-application-client.service';
import { OAuthMinApplicationClientService } from './application/min/o-auth-min-application-client.service';
import { OAuthSumApplicationClientService } from './application/sum/o-auth-sum-application-client.service';
import { OAuthUpdateApplicationClientByIdService } from './application/update/o-auth-update-application-client-by-id.service';
import { OAuthUpdateApplicationsClientsService } from './application/update/o-auth-update-applications-clients.service';
import { OAuthUpdateAndIncrementApplicationsClientsService } from './application/update/o-auth-update-and-increment-applications-clients.service';
import { OAuthUpsertApplicationClientService } from './application/upsert/o-auth-upsert-application-client.service';
import { OAuthDeleteApplicationClientByIdService } from './application/delete/o-auth-delete-application-client-by-id.service';
import { OAuthDeleteApplicationsClientsService } from './application/delete/o-auth-delete-applications-clients.service';

export const OAuthApplicationClientHandlers = [
    // commands
    OAuthCreateApplicationClientCommandHandler,
    OAuthCreateApplicationsClientsCommandHandler,
    OAuthUpdateApplicationClientByIdCommandHandler,
    OAuthUpdateApplicationsClientsCommandHandler,
    OAuthUpdateAndIncrementApplicationsClientsCommandHandler,
    OAuthUpsertApplicationClientCommandHandler,
    OAuthDeleteApplicationClientByIdCommandHandler,
    OAuthDeleteApplicationsClientsCommandHandler,

    // queries
    OAuthPaginateApplicationsClientsQueryHandler,
    OAuthGetApplicationsClientsQueryHandler,
    OAuthFindApplicationClientQueryHandler,
    OAuthFindApplicationClientByIdQueryHandler,
    OAuthRawSQLApplicationsClientsQueryHandler,
    OAuthCountApplicationClientQueryHandler,
    OAuthMaxApplicationClientQueryHandler,
    OAuthMinApplicationClientQueryHandler,
    OAuthSumApplicationClientQueryHandler,

    // events
    OAuthCreatedApplicationClientEventHandler,
    OAuthCreatedApplicationsClientsEventHandler,
    OAuthUpdatedApplicationClientEventHandler,
    OAuthUpdatedApplicationsClientsEventHandler,
    OAuthUpdatedAndIncrementedApplicationsClientsEventHandler,
    OAuthDeletedApplicationClientEventHandler,
    OAuthDeletedApplicationsClientsEventHandler,
];

export const OAuthApplicationClientServices = [
    OAuthCreateApplicationClientService,
    OAuthCreateApplicationsClientsService,
    OAuthPaginateApplicationsClientsService,
    OAuthGetApplicationsClientsService,
    OAuthFindApplicationClientService,
    OAuthFindApplicationClientByIdService,
    OAuthRawSQLApplicationsClientsService,
    OAuthCountApplicationClientService,
    OAuthMaxApplicationClientService,
    OAuthMinApplicationClientService,
    OAuthSumApplicationClientService,
    OAuthUpdateApplicationClientByIdService,
    OAuthUpdateApplicationsClientsService,
    OAuthUpdateAndIncrementApplicationsClientsService,
    OAuthUpsertApplicationClientService,
    OAuthDeleteApplicationClientByIdService,
    OAuthDeleteApplicationsClientsService,
];