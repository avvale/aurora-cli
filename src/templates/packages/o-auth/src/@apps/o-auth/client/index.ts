// commands
import { CreateClientCommandHandler } from './application/create/create-client.command-handler';
import { CreateClientsCommandHandler } from './application/create/create-clients.command-handler';
import { UpdateClientCommandHandler } from './application/update/update-client.command-handler';
import { DeleteClientByIdCommandHandler } from './application/delete/delete-client-by-id.command-handler';
import { DeleteClientsCommandHandler } from './application/delete/delete-clients.command-handler';

// queries
import { PaginateClientsQueryHandler } from './application/paginate/paginate-clients.query-handler';
import { GetClientsQueryHandler } from './application/get/get-clients.query-handler';
import { FindClientQueryHandler } from './application/find/find-client.query-handler';
import { FindClientByIdQueryHandler } from './application/find/find-client-by-id.query-handler';

// events
import { CreatedClientEventHandler } from './application/events/created-client.event-handler';
import { CreatedClientsEventHandler } from './application/events/created-clients.event-handler';
import { UpdatedClientEventHandler } from './application/events/updated-client.event-handler';
import { DeletedClientEventHandler } from './application/events/deleted-client.event-handler';
import { DeletedClientsEventHandler } from './application/events/deleted-clients.event-handler';

// services
import { CreateClientService } from './application/create/create-client.service';
import { CreateClientsService } from './application/create/create-clients.service';
import { PaginateClientsService } from './application/paginate/paginate-clients.service';
import { GetClientsService } from './application/get/get-clients.service';
import { FindClientService } from './application/find/find-client.service';
import { FindClientByIdService } from './application/find/find-client-by-id.service';
import { UpdateClientService } from './application/update/update-client.service';
import { DeleteClientByIdService } from './application/delete/delete-client-by-id.service';
import { DeleteClientsService } from './application/delete/delete-clients.service';

// models
export { OAuthClientModel } from './infrastructure/sequelize/sequelize-client.model';

// repository
export { IClientRepository } from './domain/client.repository';
export { SequelizeClientRepository } from './infrastructure/sequelize/sequelize-client.repository';

// sagas
export { ClientSagas } from './application/sagas/client.sagas';

export const OAuthClientHandlers = [
    // commands
    CreateClientCommandHandler,
    CreateClientsCommandHandler,
    UpdateClientCommandHandler,
    DeleteClientByIdCommandHandler,
    DeleteClientsCommandHandler,

    // queries
    PaginateClientsQueryHandler,
    GetClientsQueryHandler,
    FindClientQueryHandler,
    FindClientByIdQueryHandler,

    // events
    CreatedClientEventHandler,
    CreatedClientsEventHandler,
    UpdatedClientEventHandler,
    DeletedClientEventHandler,
    DeletedClientsEventHandler,
];

export const OAuthClientServices = [
    CreateClientService,
    CreateClientsService,
    PaginateClientsService,
    GetClientsService,
    FindClientService,
    FindClientByIdService,
    UpdateClientService,
    DeleteClientByIdService,
    DeleteClientsService,
];