// export commands
export { OAuthCreateApplicationCommand } from './application/create/o-auth-create-application.command';
export { OAuthCreateApplicationsCommand } from './application/create/o-auth-create-applications.command';
export { OAuthUpdateApplicationByIdCommand } from './application/update/o-auth-update-application-by-id.command';
export { OAuthUpdateApplicationsCommand } from './application/update/o-auth-update-applications.command';
export { OAuthUpdateAndIncrementApplicationsCommand } from './application/update/o-auth-update-and-increment-applications.command';
export { OAuthUpsertApplicationCommand } from './application/upsert/o-auth-upsert-application.command';
export { OAuthDeleteApplicationByIdCommand } from './application/delete/o-auth-delete-application-by-id.command';
export { OAuthDeleteApplicationsCommand } from './application/delete/o-auth-delete-applications.command';

// export queries
export { OAuthPaginateApplicationsQuery } from './application/paginate/o-auth-paginate-applications.query';
export { OAuthGetApplicationsQuery } from './application/get/o-auth-get-applications.query';
export { OAuthFindApplicationQuery } from './application/find/o-auth-find-application.query';
export { OAuthFindApplicationByIdQuery } from './application/find/o-auth-find-application-by-id.query';
export { OAuthRawSQLApplicationsQuery } from './application/raw-sql/o-auth-raw-sql-applications.query';
export { OAuthCountApplicationQuery } from './application/count/o-auth-count-application.query';
export { OAuthMaxApplicationQuery } from './application/max/o-auth-max-application.query';
export { OAuthMinApplicationQuery } from './application/min/o-auth-min-application.query';
export { OAuthSumApplicationQuery } from './application/sum/o-auth-sum-application.query';

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
export { OAuthUpdatedAndIncrementedApplicationsEvent } from './application/events/o-auth-updated-and-incremented-applications.event';
export { OAuthUpdatedAndIncrementedApplicationEvent } from './application/events/o-auth-updated-and-incremented-application.event';

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
export { OAuthSequelizeApplicationRepository } from './infrastructure/sequelize/o-auth-sequelize-application.repository';

// sagas
export { OAuthApplicationSagas } from './application/sagas/o-auth-application.sagas';

// command handlers
import { OAuthCreateApplicationCommandHandler } from './application/create/o-auth-create-application.command-handler';
import { OAuthCreateApplicationsCommandHandler } from './application/create/o-auth-create-applications.command-handler';
import { OAuthUpdateApplicationByIdCommandHandler } from './application/update/o-auth-update-application-by-id.command-handler';
import { OAuthUpdateApplicationsCommandHandler } from './application/update/o-auth-update-applications.command-handler';
import { OAuthUpdateAndIncrementApplicationsCommandHandler } from './application/update/o-auth-update-and-increment-applications.command-handler';
import { OAuthUpsertApplicationCommandHandler } from './application/upsert/o-auth-upsert-application.command-handler';
import { OAuthDeleteApplicationByIdCommandHandler } from './application/delete/o-auth-delete-application-by-id.command-handler';
import { OAuthDeleteApplicationsCommandHandler } from './application/delete/o-auth-delete-applications.command-handler';

// query handlers
import { OAuthPaginateApplicationsQueryHandler } from './application/paginate/o-auth-paginate-applications.query-handler';
import { OAuthGetApplicationsQueryHandler } from './application/get/o-auth-get-applications.query-handler';
import { OAuthFindApplicationQueryHandler } from './application/find/o-auth-find-application.query-handler';
import { OAuthFindApplicationByIdQueryHandler } from './application/find/o-auth-find-application-by-id.query-handler';
import { OAuthRawSQLApplicationsQueryHandler } from './application/raw-sql/o-auth-raw-sql-applications.query-handler';
import { OAuthCountApplicationQueryHandler } from './application/count/o-auth-count-application.query-handler';
import { OAuthMaxApplicationQueryHandler } from './application/max/o-auth-max-application.query-handler';
import { OAuthMinApplicationQueryHandler } from './application/min/o-auth-min-application.query-handler';
import { OAuthSumApplicationQueryHandler } from './application/sum/o-auth-sum-application.query-handler';

// event handlers
import { OAuthCreatedApplicationEventHandler } from './application/events/o-auth-created-application.event-handler';
import { OAuthCreatedApplicationsEventHandler } from './application/events/o-auth-created-applications.event-handler';
import { OAuthUpdatedApplicationEventHandler } from './application/events/o-auth-updated-application.event-handler';
import { OAuthUpdatedApplicationsEventHandler } from './application/events/o-auth-updated-applications.event-handler';
import { OAuthUpdatedAndIncrementedApplicationsEventHandler } from './application/events/o-auth-updated-and-incremented-applications.event-handler';
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
import { OAuthCountApplicationService } from './application/count/o-auth-count-application.service';
import { OAuthMaxApplicationService } from './application/max/o-auth-max-application.service';
import { OAuthMinApplicationService } from './application/min/o-auth-min-application.service';
import { OAuthSumApplicationService } from './application/sum/o-auth-sum-application.service';
import { OAuthUpdateApplicationByIdService } from './application/update/o-auth-update-application-by-id.service';
import { OAuthUpdateApplicationsService } from './application/update/o-auth-update-applications.service';
import { OAuthUpdateAndIncrementApplicationsService } from './application/update/o-auth-update-and-increment-applications.service';
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
    OAuthUpdateAndIncrementApplicationsCommandHandler,
    OAuthUpsertApplicationCommandHandler,
    OAuthDeleteApplicationByIdCommandHandler,
    OAuthDeleteApplicationsCommandHandler,

    // queries
    OAuthPaginateApplicationsQueryHandler,
    OAuthGetApplicationsQueryHandler,
    OAuthFindApplicationQueryHandler,
    OAuthFindApplicationByIdQueryHandler,
    OAuthRawSQLApplicationsQueryHandler,
    OAuthCountApplicationQueryHandler,
    OAuthMaxApplicationQueryHandler,
    OAuthMinApplicationQueryHandler,
    OAuthSumApplicationQueryHandler,

    // events
    OAuthCreatedApplicationEventHandler,
    OAuthCreatedApplicationsEventHandler,
    OAuthUpdatedApplicationEventHandler,
    OAuthUpdatedApplicationsEventHandler,
    OAuthUpdatedAndIncrementedApplicationsEventHandler,
    OAuthDeletedApplicationEventHandler,
    OAuthDeletedApplicationsEventHandler,

    // ---- customizations ----
    OAuthFindApplicationByAuthorizationHeaderQueryHandler,
];

export const OAuthApplicationServices = [
    OAuthCreateApplicationService,
    OAuthCreateApplicationsService,
    OAuthPaginateApplicationsService,
    OAuthGetApplicationsService,
    OAuthFindApplicationService,
    OAuthFindApplicationByIdService,
    OAuthRawSQLApplicationsService,
    OAuthCountApplicationService,
    OAuthMaxApplicationService,
    OAuthMinApplicationService,
    OAuthSumApplicationService,
    OAuthUpdateApplicationByIdService,
    OAuthUpdateApplicationsService,
    OAuthUpdateAndIncrementApplicationsService,
    OAuthUpsertApplicationService,
    OAuthDeleteApplicationByIdService,
    OAuthDeleteApplicationsService,

    // ---- customizations ----
    OAuthFindApplicationByAuthorizationHeaderService,
];