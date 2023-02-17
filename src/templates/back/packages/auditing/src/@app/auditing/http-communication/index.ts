// commands
import { CreateHttpCommunicationCommandHandler } from './application/create/create-http-communication.command-handler';
import { CreateHttpCommunicationsCommandHandler } from './application/create/create-http-communications.command-handler';
import { UpdateHttpCommunicationByIdCommandHandler } from './application/update/update-http-communication-by-id.command-handler';
import { UpdateHttpCommunicationsCommandHandler } from './application/update/update-http-communications.command-handler';
import { UpsertHttpCommunicationCommandHandler } from './application/upsert/upsert-http-communication.command-handler';
import { DeleteHttpCommunicationByIdCommandHandler } from './application/delete/delete-http-communication-by-id.command-handler';
import { DeleteHttpCommunicationsCommandHandler } from './application/delete/delete-http-communications.command-handler';

// queries
import { PaginateHttpCommunicationsQueryHandler } from './application/paginate/paginate-http-communications.query-handler';
import { GetHttpCommunicationsQueryHandler } from './application/get/get-http-communications.query-handler';
import { FindHttpCommunicationQueryHandler } from './application/find/find-http-communication.query-handler';
import { FindHttpCommunicationByIdQueryHandler } from './application/find/find-http-communication-by-id.query-handler';
import { RawSQLHttpCommunicationsQueryHandler } from './application/raw-sql/raw-sql-http-communications.query-handler';

// events
import { CreatedHttpCommunicationEventHandler } from './application/events/created-http-communication.event-handler';
import { CreatedHttpCommunicationsEventHandler } from './application/events/created-http-communications.event-handler';
import { UpdatedHttpCommunicationEventHandler } from './application/events/updated-http-communication.event-handler';
import { UpdatedHttpCommunicationsEventHandler } from './application/events/updated-http-communications.event-handler';
import { DeletedHttpCommunicationEventHandler } from './application/events/deleted-http-communication.event-handler';
import { DeletedHttpCommunicationsEventHandler } from './application/events/deleted-http-communications.event-handler';

// services
import { CreateHttpCommunicationService } from './application/create/create-http-communication.service';
import { CreateHttpCommunicationsService } from './application/create/create-http-communications.service';
import { PaginateHttpCommunicationsService } from './application/paginate/paginate-http-communications.service';
import { GetHttpCommunicationsService } from './application/get/get-http-communications.service';
import { FindHttpCommunicationService } from './application/find/find-http-communication.service';
import { FindHttpCommunicationByIdService } from './application/find/find-http-communication-by-id.service';
import { RawSQLHttpCommunicationsService } from './application/raw-sql/raw-sql-http-communications.service';
import { UpdateHttpCommunicationByIdService } from './application/update/update-http-communication-by-id.service';
import { UpdateHttpCommunicationsService } from './application/update/update-http-communications.service';
import { UpsertHttpCommunicationService } from './application/upsert/upsert-http-communication.service';
import { DeleteHttpCommunicationByIdService } from './application/delete/delete-http-communication-by-id.service';
import { DeleteHttpCommunicationsService } from './application/delete/delete-http-communications.service';

// models
export { AuditingHttpCommunicationModel } from './infrastructure/sequelize/sequelize-http-communication.model';

// repository
export { IHttpCommunicationRepository } from './domain/http-communication.repository';
export { SequelizeHttpCommunicationRepository } from './infrastructure/sequelize/sequelize-http-communication.repository';

// sagas
export { HttpCommunicationSagas } from './application/sagas/http-communication.sagas';

export const AuditingHttpCommunicationHandlers = [
    // commands
    CreateHttpCommunicationCommandHandler,
    CreateHttpCommunicationsCommandHandler,
    UpdateHttpCommunicationByIdCommandHandler,
    UpdateHttpCommunicationsCommandHandler,
    UpsertHttpCommunicationCommandHandler,
    DeleteHttpCommunicationByIdCommandHandler,
    DeleteHttpCommunicationsCommandHandler,

    // queries
    PaginateHttpCommunicationsQueryHandler,
    GetHttpCommunicationsQueryHandler,
    FindHttpCommunicationQueryHandler,
    FindHttpCommunicationByIdQueryHandler,
    RawSQLHttpCommunicationsQueryHandler,

    // events
    CreatedHttpCommunicationEventHandler,
    CreatedHttpCommunicationsEventHandler,
    UpdatedHttpCommunicationEventHandler,
    UpdatedHttpCommunicationsEventHandler,
    DeletedHttpCommunicationEventHandler,
    DeletedHttpCommunicationsEventHandler,
];

export const AuditingHttpCommunicationServices = [
    CreateHttpCommunicationService,
    CreateHttpCommunicationsService,
    PaginateHttpCommunicationsService,
    GetHttpCommunicationsService,
    FindHttpCommunicationService,
    FindHttpCommunicationByIdService,
    RawSQLHttpCommunicationsService,
    UpdateHttpCommunicationByIdService,
    UpdateHttpCommunicationsService,
    UpsertHttpCommunicationService,
    DeleteHttpCommunicationByIdService,
    DeleteHttpCommunicationsService,
];