// export commands
export { OAuthCreateApplicationCommand } from './application/create/o-auth-create-application.command';
export { OAuthCreateApplicationsCommand } from './application/create/o-auth-create-applications.command';
export { OAuthUpdateApplicationByIdCommand } from './application/update/o-auth-update-application-by-id.command';
export { OAuthUpdateApplicationsCommand } from './application/update/o-auth-update-applications.command';
export { OAuthUpsertApplicationCommand } from './application/upsert/o-auth-upsert-application.command';
export { OAuthDeleteApplicationByIdCommand } from './application/delete/o-auth-delete-application-by-id.command';
export { OAuthDeleteApplicationsCommand } from './application/delete/o-auth-delete-applications.command';

// export queries
export { OAuthPaginateApplicationsQuery } from './application/paginate/o-auth-paginate-applications.query';
export { OAuthGetApplicationsQuery } from './application/get/o-auth-get-applications.query';
export { OAuthFindApplicationQuery } from './application/find/o-auth-find-application.query';
export { OAuthFindApplicationByIdQuery } from './application/find/o-auth-find-application-by-id.query';
export { OAuthRawSQLApplicationsQuery } from './application/raw-sql/o-auth-raw-sql-applications.query';

// export mocks
export { oAuthMockApplicationData } from './infrastructure/mock/o-auth-mock-application.data';
export { OAuthMockApplicationSeeder } from './infrastructure/mock/o-auth-mock-application.seeder';
export { OAuthMockApplicationRepository } from './infrastructure/mock/o-auth-mock-application.repository';

// export events
export { OAuthAddApplicationsContextEvent } from './application/events/o-auth-add-applications-context.event';
export { OAuthCreatedApplicationsEvent } from './application/events/o-auth-created-applications.event';
export { OAuthCreatedApplicationEvent } from './application/events/o-auth-created-application.event';
export { OAuthDeletedApplicationsEvent } from './application/events/o-auth-deleted-applications.event';
export { OAuthDeletedApplicationEvent } from './application/events/o-auth-deleted-application.event';
export { OAuthUpdatedApplicationsEvent } from './application/events/o-auth-updated-applications.event';
export { OAuthUpdatedApplicationEvent } from './application/events/o-auth-updated-application.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { OAuthApplication } from './domain/o-auth-application.aggregate';
export { OAuthApplicationMapper } from './domain/o-auth-application.mapper';
export { OAuthIApplicationRepository } from './domain/o-auth-application.repository';
export { OAuthApplicationResponse } from './domain/o-auth-application.response';

// infrastructure
export { OAuthApplicationModel } from './infrastructure/sequelize/o-auth-sequelize-application.model';
export { OAuthApplicationsClientsModel } from './infrastructure/sequelize/o-auth-sequelize-applications-clients.model';
export { OAuthSequelizeApplicationRepository } from './infrastructure/sequelize/o-auth-sequelize-application.repository';

// sagas
export { OAuthApplicationSagas } from './application/sagas/o-auth-application.sagas';

// command handlers
import { OAuthCreateApplicationCommandHandler } from './application/create/o-auth-create-application.command-handler';
import { OAuthCreateApplicationsCommandHandler } from './application/create/o-auth-create-applications.command-handler';
import { OAuthUpdateApplicationByIdCommandHandler } from './application/update/o-auth-update-application-by-id.command-handler';
import { OAuthUpdateApplicationsCommandHandler } from './application/update/o-auth-update-applications.command-handler';
import { OAuthUpsertApplicationCommandHandler } from './application/upsert/o-auth-upsert-application.command-handler';
import { OAuthDeleteApplicationByIdCommandHandler } from './application/delete/o-auth-delete-application-by-id.command-handler';
import { OAuthDeleteApplicationsCommandHandler } from './application/delete/o-auth-delete-applications.command-handler';

// query handlers
import { OAuthPaginateApplicationsQueryHandler } from './application/paginate/o-auth-paginate-applications.query-handler';
import { OAuthGetApplicationsQueryHandler } from './application/get/o-auth-get-applications.query-handler';
import { OAuthFindApplicationQueryHandler } from './application/find/o-auth-find-application.query-handler';
import { OAuthFindApplicationByIdQueryHandler } from './application/find/o-auth-find-application-by-id.query-handler';
import { OAuthRawSQLApplicationsQueryHandler } from './application/raw-sql/o-auth-raw-sql-applications.query-handler';

// event handlers
import { OAuthCreatedApplicationEventHandler } from './application/events/o-auth-created-application.event-handler';
import { OAuthCreatedApplicationsEventHandler } from './application/events/o-auth-created-applications.event-handler';
import { OAuthUpdatedApplicationEventHandler } from './application/events/o-auth-updated-application.event-handler';
import { OAuthUpdatedApplicationsEventHandler } from './application/events/o-auth-updated-applications.event-handler';
import { OAuthDeletedApplicationEventHandler } from './application/events/o-auth-deleted-application.event-handler';
import { OAuthDeletedApplicationsEventHandler } from './application/events/o-auth-deleted-applications.event-handler';

// services
import { OAuthCreateApplicationService } from './application/create/o-auth-create-application.service';
import { OAuthCreateApplicationsService } from './application/create/o-auth-create-applications.service';
import { OAuthPaginateApplicationsService } from './application/paginate/o-auth-paginate-applications.service';
import { OAuthGetApplicationsService } from './application/get/o-auth-get-applications.service';
import { OAuthFindApplicationService } from './application/find/o-auth-find-application.service';
import { OAuthFindApplicationByIdService } from './application/find/o-auth-find-application-by-id.service';
import { OAuthRawSQLApplicationsService } from './application/raw-sql/o-auth-raw-sql-applications.service';
import { OAuthUpdateApplicationByIdService } from './application/update/o-auth-update-application-by-id.service';
import { OAuthUpdateApplicationsService } from './application/update/o-auth-update-applications.service';
import { OAuthUpsertApplicationService } from './application/upsert/o-auth-upsert-application.service';
import { OAuthDeleteApplicationByIdService } from './application/delete/o-auth-delete-application-by-id.service';
import { OAuthDeleteApplicationsService } from './application/delete/o-auth-delete-applications.service';

// ---- customizations ----
export { OAuthFindApplicationByAuthorizationHeaderQuery } from './application/find/o-auth-find-application-by-authorization-header.query';
import { OAuthFindApplicationByAuthorizationHeaderQueryHandler } from './application/find/o-auth-find-application-by-authorization-header.query-handler';
import { OAuthFindApplicationByAuthorizationHeaderService } from './application/find/o-auth-find-application-by-authorization-header.service';

export const OAuthApplicationHandlers = [
    // commands
    OAuthCreateApplicationCommandHandler,
    OAuthCreateApplicationsCommandHandler,
    OAuthUpdateApplicationByIdCommandHandler,
    OAuthUpdateApplicationsCommandHandler,
    OAuthUpsertApplicationCommandHandler,
    OAuthDeleteApplicationByIdCommandHandler,
    OAuthDeleteApplicationsCommandHandler,

    // queries
    OAuthPaginateApplicationsQueryHandler,
    OAuthGetApplicationsQueryHandler,
    OAuthFindApplicationQueryHandler,
    OAuthFindApplicationByIdQueryHandler,
    OAuthRawSQLApplicationsQueryHandler,

    // ---- customizations ----
    OAuthFindApplicationByAuthorizationHeaderQueryHandler,

    // events
    OAuthCreatedApplicationEventHandler,
    OAuthCreatedApplicationsEventHandler,
    OAuthUpdatedApplicationEventHandler,
    OAuthUpdatedApplicationsEventHandler,
    OAuthDeletedApplicationEventHandler,
    OAuthDeletedApplicationsEventHandler,
];

export const OAuthApplicationServices = [
    OAuthCreateApplicationService,
    OAuthCreateApplicationsService,
    OAuthPaginateApplicationsService,
    OAuthGetApplicationsService,
    OAuthFindApplicationService,
    OAuthFindApplicationByIdService,
    OAuthRawSQLApplicationsService,
    OAuthUpdateApplicationByIdService,
    OAuthUpdateApplicationsService,
    OAuthUpsertApplicationService,
    OAuthDeleteApplicationByIdService,
    OAuthDeleteApplicationsService,

    // ---- customizations ----
    OAuthFindApplicationByAuthorizationHeaderService,
];