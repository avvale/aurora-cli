// commands
import { CreateApplicationCommandHandler } from './application/create/create-application.command-handler';
import { CreateApplicationsCommandHandler } from './application/create/create-applications.command-handler';
import { UpdateApplicationByIdCommandHandler } from './application/update/update-application-by-id.command-handler';
import { UpdateApplicationsCommandHandler } from './application/update/update-applications.command-handler';
import { UpsertApplicationCommandHandler } from './application/upsert/upsert-application.command-handler';
import { DeleteApplicationByIdCommandHandler } from './application/delete/delete-application-by-id.command-handler';
import { DeleteApplicationsCommandHandler } from './application/delete/delete-applications.command-handler';

// queries
import { PaginateApplicationsQueryHandler } from './application/paginate/paginate-applications.query-handler';
import { GetApplicationsQueryHandler } from './application/get/get-applications.query-handler';
import { FindApplicationQueryHandler } from './application/find/find-application.query-handler';
import { FindApplicationByIdQueryHandler } from './application/find/find-application-by-id.query-handler';
import { RawSQLApplicationsQueryHandler } from './application/raw-sql/raw-sql-applications.query-handler';

// ---- customizations ----
import { FindApplicationByAuthorizationHeaderQueryHandler } from './application/find/find-application-by-authorization-header.query-handler';

// events
import { CreatedApplicationEventHandler } from './application/events/created-application.event-handler';
import { CreatedApplicationsEventHandler } from './application/events/created-applications.event-handler';
import { UpdatedApplicationEventHandler } from './application/events/updated-application.event-handler';
import { UpdatedApplicationsEventHandler } from './application/events/updated-applications.event-handler';
import { DeletedApplicationEventHandler } from './application/events/deleted-application.event-handler';
import { DeletedApplicationsEventHandler } from './application/events/deleted-applications.event-handler';

// services
import { CreateApplicationService } from './application/create/create-application.service';
import { CreateApplicationsService } from './application/create/create-applications.service';
import { PaginateApplicationsService } from './application/paginate/paginate-applications.service';
import { GetApplicationsService } from './application/get/get-applications.service';
import { FindApplicationService } from './application/find/find-application.service';
import { FindApplicationByIdService } from './application/find/find-application-by-id.service';
import { RawSQLApplicationsService } from './application/raw-sql/raw-sql-applications.service';
import { UpdateApplicationByIdService } from './application/update/update-application-by-id.service';
import { UpdateApplicationsService } from './application/update/update-applications.service';
import { UpsertApplicationService } from './application/upsert/upsert-application.service';
import { DeleteApplicationByIdService } from './application/delete/delete-application-by-id.service';
import { DeleteApplicationsService } from './application/delete/delete-applications.service';

// ---- customizations ----
import { FindApplicationByAuthorizationHeaderService } from './application/find/find-application-by-authorization-header.service';

// models
export { OAuthApplicationModel } from './infrastructure/sequelize/sequelize-application.model';
export { OAuthApplicationsClientsModel } from './infrastructure/sequelize/sequelize-applications-clients.model';

// repository
export { IApplicationRepository } from './domain/application.repository';
export { SequelizeApplicationRepository } from './infrastructure/sequelize/sequelize-application.repository';

// sagas
export { ApplicationSagas } from './application/sagas/application.sagas';

export const OAuthApplicationHandlers = [
    // commands
    CreateApplicationCommandHandler,
    CreateApplicationsCommandHandler,
    UpdateApplicationByIdCommandHandler,
    UpdateApplicationsCommandHandler,
    UpsertApplicationCommandHandler,
    DeleteApplicationByIdCommandHandler,
    DeleteApplicationsCommandHandler,

    // queries
    PaginateApplicationsQueryHandler,
    GetApplicationsQueryHandler,
    FindApplicationQueryHandler,
    FindApplicationByIdQueryHandler,
    RawSQLApplicationsQueryHandler,

    // ---- customizations ----
    FindApplicationByAuthorizationHeaderQueryHandler,

    // events
    CreatedApplicationEventHandler,
    CreatedApplicationsEventHandler,
    UpdatedApplicationEventHandler,
    UpdatedApplicationsEventHandler,
    DeletedApplicationEventHandler,
    DeletedApplicationsEventHandler,
];

export const OAuthApplicationServices = [
    CreateApplicationService,
    CreateApplicationsService,
    PaginateApplicationsService,
    GetApplicationsService,
    FindApplicationService,
    FindApplicationByIdService,
    RawSQLApplicationsService,
    UpdateApplicationByIdService,
    UpdateApplicationsService,
    UpsertApplicationService,
    DeleteApplicationByIdService,
    DeleteApplicationsService,

    // ---- customizations ----
    FindApplicationByAuthorizationHeaderService,
];