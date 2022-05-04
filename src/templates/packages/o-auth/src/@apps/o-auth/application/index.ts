// commands
import { CreateApplicationCommandHandler } from './application/create/create-application.command-handler';
import { CreateApplicationsCommandHandler } from './application/create/create-applications.command-handler';
import { UpdateApplicationCommandHandler } from './application/update/update-application.command-handler';
import { DeleteApplicationByIdCommandHandler } from './application/delete/delete-application-by-id.command-handler';
import { DeleteApplicationsCommandHandler } from './application/delete/delete-applications.command-handler';

// queries
import { PaginateApplicationsQueryHandler } from './application/paginate/paginate-applications.query-handler';
import { GetApplicationsQueryHandler } from './application/get/get-applications.query-handler';
import { FindApplicationQueryHandler } from './application/find/find-application.query-handler';
import { FindApplicationByIdQueryHandler } from './application/find/find-application-by-id.query-handler';
import { FindApplicationByAuthorizationHeaderQueryHandler } from './application/find/find-application-by-authorization-header.query-handler';

// events
import { CreatedApplicationEventHandler } from './application/events/created-application.event-handler';
import { CreatedApplicationsEventHandler } from './application/events/created-applications.event-handler';
import { UpdatedApplicationEventHandler } from './application/events/updated-application.event-handler';
import { DeletedApplicationEventHandler } from './application/events/deleted-application.event-handler';
import { DeletedApplicationsEventHandler } from './application/events/deleted-applications.event-handler';

// services
import { CreateApplicationService } from './application/create/create-application.service';
import { CreateApplicationsService } from './application/create/create-applications.service';
import { PaginateApplicationsService } from './application/paginate/paginate-applications.service';
import { GetApplicationsService } from './application/get/get-applications.service';
import { FindApplicationService } from './application/find/find-application.service';
import { FindApplicationByIdService } from './application/find/find-application-by-id.service';
import { UpdateApplicationService } from './application/update/update-application.service';
import { DeleteApplicationByIdService } from './application/delete/delete-application-by-id.service';
import { DeleteApplicationsService } from './application/delete/delete-applications.service';
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
    UpdateApplicationCommandHandler,
    DeleteApplicationByIdCommandHandler,
    DeleteApplicationsCommandHandler,

    // queries
    PaginateApplicationsQueryHandler,
    GetApplicationsQueryHandler,
    FindApplicationQueryHandler,
    FindApplicationByIdQueryHandler,
    FindApplicationByAuthorizationHeaderQueryHandler,

    // events
    CreatedApplicationEventHandler,
    CreatedApplicationsEventHandler,
    UpdatedApplicationEventHandler,
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
    UpdateApplicationService,
    DeleteApplicationByIdService,
    DeleteApplicationsService,
    FindApplicationByAuthorizationHeaderService,
];