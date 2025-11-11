// export commands
export { OAuthCreateApplicationCommand } from './application/create/o-auth-create-application.command';
export { OAuthCreateApplicationsCommand } from './application/create/o-auth-create-applications.command';
export { OAuthDeleteApplicationByIdCommand } from './application/delete/o-auth-delete-application-by-id.command';
export { OAuthDeleteApplicationsCommand } from './application/delete/o-auth-delete-applications.command';
export { OAuthUpdateApplicationByIdCommand } from './application/update/o-auth-update-application-by-id.command';

// export queries
export { OAuthFindApplicationByIdQuery } from './application/find/o-auth-find-application-by-id.query';
export { OAuthFindApplicationQuery } from './application/find/o-auth-find-application.query';
export { OAuthGetApplicationsQuery } from './application/get/o-auth-get-applications.query';
export { OAuthPaginateApplicationsQuery } from './application/paginate/o-auth-paginate-applications.query';

// export mocks
export { oAuthMockApplicationData } from './infrastructure/mock/o-auth-mock-application.data';
export { OAuthMockApplicationRepository } from './infrastructure/mock/o-auth-mock-application.repository';
export { OAuthMockApplicationSeeder } from './infrastructure/mock/o-auth-mock-application.seeder';

// export events
export { OAuthAddApplicationsContextEvent } from './application/events/o-auth-add-applications-context.event';
export { OAuthCreatedApplicationEvent } from './application/events/o-auth-created-application.event';
export { OAuthCreatedApplicationsEvent } from './application/events/o-auth-created-applications.event';
export { OAuthDeletedApplicationEvent } from './application/events/o-auth-deleted-application.event';
export { OAuthDeletedApplicationsEvent } from './application/events/o-auth-deleted-applications.event';
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
export { OAuthSequelizeApplicationRepository } from './infrastructure/sequelize/o-auth-sequelize-application.repository';

// sagas
export { OAuthApplicationSagas } from './application/sagas/o-auth-application.sagas';

// command handlers
import { OAuthCreateApplicationCommandHandler } from './application/create/o-auth-create-application.command-handler';
import { OAuthCreateApplicationsCommandHandler } from './application/create/o-auth-create-applications.command-handler';
import { OAuthDeleteApplicationByIdCommandHandler } from './application/delete/o-auth-delete-application-by-id.command-handler';
import { OAuthDeleteApplicationsCommandHandler } from './application/delete/o-auth-delete-applications.command-handler';
import { OAuthUpdateApplicationByIdCommandHandler } from './application/update/o-auth-update-application-by-id.command-handler';

// query handlers
import { OAuthFindApplicationByIdQueryHandler } from './application/find/o-auth-find-application-by-id.query-handler';
import { OAuthFindApplicationQueryHandler } from './application/find/o-auth-find-application.query-handler';
import { OAuthGetApplicationsQueryHandler } from './application/get/o-auth-get-applications.query-handler';
import { OAuthPaginateApplicationsQueryHandler } from './application/paginate/o-auth-paginate-applications.query-handler';

// event handlers
import { OAuthCreatedApplicationEventHandler } from './application/events/o-auth-created-application.event-handler';
import { OAuthCreatedApplicationsEventHandler } from './application/events/o-auth-created-applications.event-handler';
import { OAuthDeletedApplicationEventHandler } from './application/events/o-auth-deleted-application.event-handler';
import { OAuthDeletedApplicationsEventHandler } from './application/events/o-auth-deleted-applications.event-handler';
import { OAuthUpdatedApplicationEventHandler } from './application/events/o-auth-updated-application.event-handler';

// services
import { OAuthCreateApplicationService } from './application/create/o-auth-create-application.service';
import { OAuthCreateApplicationsService } from './application/create/o-auth-create-applications.service';
import { OAuthDeleteApplicationByIdService } from './application/delete/o-auth-delete-application-by-id.service';
import { OAuthDeleteApplicationsService } from './application/delete/o-auth-delete-applications.service';
import { OAuthFindApplicationByIdService } from './application/find/o-auth-find-application-by-id.service';
import { OAuthFindApplicationService } from './application/find/o-auth-find-application.service';
import { OAuthGetApplicationsService } from './application/get/o-auth-get-applications.service';
import { OAuthPaginateApplicationsService } from './application/paginate/o-auth-paginate-applications.service';
import { OAuthUpdateApplicationByIdService } from './application/update/o-auth-update-application-by-id.service';

/* #region customizations */
export { OAuthFindApplicationByAuthorizationHeaderQuery } from './application/find/o-auth-find-application-by-authorization-header.query';
import { OAuthFindApplicationByAuthorizationHeaderQueryHandler } from './application/find/o-auth-find-application-by-authorization-header.query-handler';
import { OAuthFindApplicationByAuthorizationHeaderService } from './application/find/o-auth-find-application-by-authorization-header.service';
/* #endregion customizations */

export const OAuthApplicationHandlers = [
    /* #region customizations */
    OAuthFindApplicationByAuthorizationHeaderQueryHandler,
    /* #endregion customizations */

    // commands
    OAuthCreateApplicationCommandHandler,
    OAuthCreateApplicationsCommandHandler,
    OAuthUpdateApplicationByIdCommandHandler,
    OAuthDeleteApplicationByIdCommandHandler,
    OAuthDeleteApplicationsCommandHandler,

    // queries
    OAuthPaginateApplicationsQueryHandler,
    OAuthGetApplicationsQueryHandler,
    OAuthFindApplicationQueryHandler,
    OAuthFindApplicationByIdQueryHandler,

    // events
    OAuthCreatedApplicationEventHandler,
    OAuthCreatedApplicationsEventHandler,
    OAuthUpdatedApplicationEventHandler,
    OAuthDeletedApplicationEventHandler,
    OAuthDeletedApplicationsEventHandler,
];

export const OAuthApplicationServices = [
    /* #region customizations */
    OAuthFindApplicationByAuthorizationHeaderService,
    /* #endregion customizations */

    OAuthCreateApplicationService,
    OAuthCreateApplicationsService,
    OAuthPaginateApplicationsService,
    OAuthGetApplicationsService,
    OAuthFindApplicationService,
    OAuthFindApplicationByIdService,
    OAuthUpdateApplicationByIdService,
    OAuthDeleteApplicationByIdService,
    OAuthDeleteApplicationsService,
];
