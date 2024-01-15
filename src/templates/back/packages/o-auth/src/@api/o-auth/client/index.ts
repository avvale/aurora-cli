// export DTOs
export { OAuthClientDto } from './dto/o-auth-client.dto';
export { OAuthCreateClientDto } from './dto/o-auth-create-client.dto';
export { OAuthUpdateClientByIdDto } from './dto/o-auth-update-client-by-id.dto';
export { OAuthUpdateClientsDto } from './dto/o-auth-update-clients.dto';

// export handlers
export { OAuthCreateClientHandler } from './handlers/o-auth-create-client.handler';
export { OAuthCreateClientsHandler } from './handlers/o-auth-create-clients.handler';
export { OAuthPaginateClientsHandler } from './handlers/o-auth-paginate-clients.handler';
export { OAuthGetClientsHandler } from './handlers/o-auth-get-clients.handler';
export { OAuthFindClientByIdHandler } from './handlers/o-auth-find-client-by-id.handler';
export { OAuthFindClientHandler } from './handlers/o-auth-find-client.handler';
export { OAuthUpdateClientByIdHandler } from './handlers/o-auth-update-client-by-id.handler';
export { OAuthUpdateClientsHandler } from './handlers/o-auth-update-clients.handler';
export { OAuthUpsertClientHandler } from './handlers/o-auth-upsert-client.handler';
export { OAuthDeleteClientByIdHandler } from './handlers/o-auth-delete-client-by-id.handler';
export { OAuthDeleteClientsHandler } from './handlers/o-auth-delete-clients.handler';

// export controllers
export { OAuthCreateClientController } from './controllers/o-auth-create-client.controller';
export { OAuthCreateClientsController } from './controllers/o-auth-create-clients.controller';
export { OAuthPaginateClientsController } from './controllers/o-auth-paginate-clients.controller';
export { OAuthGetClientsController } from './controllers/o-auth-get-clients.controller';
export { OAuthFindClientByIdController } from './controllers/o-auth-find-client-by-id.controller';
export { OAuthFindClientController } from './controllers/o-auth-find-client.controller';
export { OAuthUpdateClientByIdController } from './controllers/o-auth-update-client-by-id.controller';
export { OAuthUpdateClientsController } from './controllers/o-auth-update-clients.controller';
export { OAuthUpsertClientController } from './controllers/o-auth-upsert-client.controller';
export { OAuthDeleteClientByIdController } from './controllers/o-auth-delete-client-by-id.controller';
export { OAuthDeleteClientsController } from './controllers/o-auth-delete-clients.controller';

// export resolvers
export { OAuthCreateClientResolver } from './resolvers/o-auth-create-client.resolver';
export { OAuthCreateClientsResolver } from './resolvers/o-auth-create-clients.resolver';
export { OAuthPaginateClientsResolver } from './resolvers/o-auth-paginate-clients.resolver';
export { OAuthGetClientsResolver } from './resolvers/o-auth-get-clients.resolver';
export { OAuthFindClientByIdResolver } from './resolvers/o-auth-find-client-by-id.resolver';
export { OAuthFindClientResolver } from './resolvers/o-auth-find-client.resolver';
export { OAuthUpdateClientByIdResolver } from './resolvers/o-auth-update-client-by-id.resolver';
export { OAuthUpdateClientsResolver } from './resolvers/o-auth-update-clients.resolver';
export { OAuthUpsertClientResolver } from './resolvers/o-auth-upsert-client.resolver';
export { OAuthDeleteClientByIdResolver } from './resolvers/o-auth-delete-client-by-id.resolver';
export { OAuthDeleteClientsResolver } from './resolvers/o-auth-delete-clients.resolver';

// import controllers
import { OAuthCreateClientController } from './controllers/o-auth-create-client.controller';
import { OAuthCreateClientsController } from './controllers/o-auth-create-clients.controller';
import { OAuthPaginateClientsController } from './controllers/o-auth-paginate-clients.controller';
import { OAuthGetClientsController } from './controllers/o-auth-get-clients.controller';
import { OAuthFindClientByIdController } from './controllers/o-auth-find-client-by-id.controller';
import { OAuthFindClientController } from './controllers/o-auth-find-client.controller';
import { OAuthUpdateClientByIdController } from './controllers/o-auth-update-client-by-id.controller';
import { OAuthUpdateClientsController } from './controllers/o-auth-update-clients.controller';
import { OAuthUpsertClientController } from './controllers/o-auth-upsert-client.controller';
import { OAuthDeleteClientByIdController } from './controllers/o-auth-delete-client-by-id.controller';
import { OAuthDeleteClientsController } from './controllers/o-auth-delete-clients.controller';

// import resolvers
import { OAuthCreateClientResolver } from './resolvers/o-auth-create-client.resolver';
import { OAuthCreateClientsResolver } from './resolvers/o-auth-create-clients.resolver';
import { OAuthPaginateClientsResolver } from './resolvers/o-auth-paginate-clients.resolver';
import { OAuthGetClientsResolver } from './resolvers/o-auth-get-clients.resolver';
import { OAuthFindClientByIdResolver } from './resolvers/o-auth-find-client-by-id.resolver';
import { OAuthFindClientResolver } from './resolvers/o-auth-find-client.resolver';
import { OAuthUpdateClientByIdResolver } from './resolvers/o-auth-update-client-by-id.resolver';
import { OAuthUpdateClientsResolver } from './resolvers/o-auth-update-clients.resolver';
import { OAuthUpsertClientResolver } from './resolvers/o-auth-upsert-client.resolver';
import { OAuthDeleteClientByIdResolver } from './resolvers/o-auth-delete-client-by-id.resolver';
import { OAuthDeleteClientsResolver } from './resolvers/o-auth-delete-clients.resolver';

// import handlers
import { OAuthCreateClientHandler } from './handlers/o-auth-create-client.handler';
import { OAuthCreateClientsHandler } from './handlers/o-auth-create-clients.handler';
import { OAuthPaginateClientsHandler } from './handlers/o-auth-paginate-clients.handler';
import { OAuthGetClientsHandler } from './handlers/o-auth-get-clients.handler';
import { OAuthFindClientByIdHandler } from './handlers/o-auth-find-client-by-id.handler';
import { OAuthFindClientHandler } from './handlers/o-auth-find-client.handler';
import { OAuthUpdateClientByIdHandler } from './handlers/o-auth-update-client-by-id.handler';
import { OAuthUpdateClientsHandler } from './handlers/o-auth-update-clients.handler';
import { OAuthUpsertClientHandler } from './handlers/o-auth-upsert-client.handler';
import { OAuthDeleteClientByIdHandler } from './handlers/o-auth-delete-client-by-id.handler';
import { OAuthDeleteClientsHandler } from './handlers/o-auth-delete-clients.handler';

// import seeder
import { OAuthClientSeeder } from './seeder/o-auth-client.seeder';

export const OAuthClientApiControllers = [
    OAuthCreateClientController,
    OAuthCreateClientsController,
    OAuthPaginateClientsController,
    OAuthGetClientsController,
    OAuthFindClientByIdController,
    OAuthFindClientController,
    OAuthUpdateClientByIdController,
    OAuthUpdateClientsController,
    OAuthUpsertClientController,
    OAuthDeleteClientByIdController,
    OAuthDeleteClientsController,
];

export const OAuthClientApiResolvers = [
    OAuthCreateClientResolver,
    OAuthCreateClientsResolver,
    OAuthPaginateClientsResolver,
    OAuthGetClientsResolver,
    OAuthFindClientByIdResolver,
    OAuthFindClientResolver,
    OAuthUpdateClientByIdResolver,
    OAuthUpdateClientsResolver,
    OAuthUpsertClientResolver,
    OAuthDeleteClientByIdResolver,
    OAuthDeleteClientsResolver,
];

export const OAuthClientApiHandlers = [
    OAuthCreateClientHandler,
    OAuthCreateClientsHandler,
    OAuthPaginateClientsHandler,
    OAuthGetClientsHandler,
    OAuthFindClientByIdHandler,
    OAuthFindClientHandler,
    OAuthUpdateClientByIdHandler,
    OAuthUpdateClientsHandler,
    OAuthUpsertClientHandler,
    OAuthDeleteClientByIdHandler,
    OAuthDeleteClientsHandler,
];

export const OAuthClientApiServices = [
    OAuthClientSeeder,
];
