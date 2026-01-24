// export DTOs
export { OAuthClientDto } from './dto/o-auth-client.dto';
export { OAuthCreateClientDto } from './dto/o-auth-create-client.dto';
export { OAuthUpdateClientByIdDto } from './dto/o-auth-update-client-by-id.dto';
export { OAuthUpdateClientsDto } from './dto/o-auth-update-clients.dto';

// export handlers
export { OAuthCreateClientHandler } from './handlers/o-auth-create-client.handler';
export { OAuthCreateClientsHandler } from './handlers/o-auth-create-clients.handler';
export { OAuthDeleteClientByIdHandler } from './handlers/o-auth-delete-client-by-id.handler';
export { OAuthDeleteClientsHandler } from './handlers/o-auth-delete-clients.handler';
export { OAuthFindClientByIdHandler } from './handlers/o-auth-find-client-by-id.handler';
export { OAuthFindClientHandler } from './handlers/o-auth-find-client.handler';
export { OAuthGetClientsHandler } from './handlers/o-auth-get-clients.handler';
export { OAuthPaginateClientsHandler } from './handlers/o-auth-paginate-clients.handler';
export { OAuthUpdateClientByIdHandler } from './handlers/o-auth-update-client-by-id.handler';

// export controllers
export { OAuthCreateClientController } from './controllers/o-auth-create-client.controller';
export { OAuthCreateClientsController } from './controllers/o-auth-create-clients.controller';
export { OAuthDeleteClientByIdController } from './controllers/o-auth-delete-client-by-id.controller';
export { OAuthDeleteClientsController } from './controllers/o-auth-delete-clients.controller';
export { OAuthFindClientByIdController } from './controllers/o-auth-find-client-by-id.controller';
export { OAuthFindClientController } from './controllers/o-auth-find-client.controller';
export { OAuthGetClientsController } from './controllers/o-auth-get-clients.controller';
export { OAuthPaginateClientsController } from './controllers/o-auth-paginate-clients.controller';
export { OAuthUpdateClientByIdController } from './controllers/o-auth-update-client-by-id.controller';

// export resolvers
export { OAuthCreateClientResolver } from './resolvers/o-auth-create-client.resolver';
export { OAuthCreateClientsResolver } from './resolvers/o-auth-create-clients.resolver';
export { OAuthDeleteClientByIdResolver } from './resolvers/o-auth-delete-client-by-id.resolver';
export { OAuthDeleteClientsResolver } from './resolvers/o-auth-delete-clients.resolver';
export { OAuthFindClientByIdResolver } from './resolvers/o-auth-find-client-by-id.resolver';
export { OAuthFindClientResolver } from './resolvers/o-auth-find-client.resolver';
export { OAuthGetClientsResolver } from './resolvers/o-auth-get-clients.resolver';
export { OAuthPaginateClientsResolver } from './resolvers/o-auth-paginate-clients.resolver';
export { OAuthUpdateClientByIdResolver } from './resolvers/o-auth-update-client-by-id.resolver';

// import controllers
import { OAuthCreateClientController } from './controllers/o-auth-create-client.controller';
import { OAuthCreateClientsController } from './controllers/o-auth-create-clients.controller';
import { OAuthDeleteClientByIdController } from './controllers/o-auth-delete-client-by-id.controller';
import { OAuthDeleteClientsController } from './controllers/o-auth-delete-clients.controller';
import { OAuthFindClientByIdController } from './controllers/o-auth-find-client-by-id.controller';
import { OAuthFindClientController } from './controllers/o-auth-find-client.controller';
import { OAuthGetClientsController } from './controllers/o-auth-get-clients.controller';
import { OAuthPaginateClientsController } from './controllers/o-auth-paginate-clients.controller';
import { OAuthUpdateClientByIdController } from './controllers/o-auth-update-client-by-id.controller';

// import resolvers
import { OAuthCreateClientResolver } from './resolvers/o-auth-create-client.resolver';
import { OAuthCreateClientsResolver } from './resolvers/o-auth-create-clients.resolver';
import { OAuthDeleteClientByIdResolver } from './resolvers/o-auth-delete-client-by-id.resolver';
import { OAuthDeleteClientsResolver } from './resolvers/o-auth-delete-clients.resolver';
import { OAuthFindClientByIdResolver } from './resolvers/o-auth-find-client-by-id.resolver';
import { OAuthFindClientResolver } from './resolvers/o-auth-find-client.resolver';
import { OAuthGetClientsResolver } from './resolvers/o-auth-get-clients.resolver';
import { OAuthPaginateClientsResolver } from './resolvers/o-auth-paginate-clients.resolver';
import { OAuthUpdateClientByIdResolver } from './resolvers/o-auth-update-client-by-id.resolver';

// import handlers
import { OAuthCreateClientHandler } from './handlers/o-auth-create-client.handler';
import { OAuthCreateClientsHandler } from './handlers/o-auth-create-clients.handler';
import { OAuthDeleteClientByIdHandler } from './handlers/o-auth-delete-client-by-id.handler';
import { OAuthDeleteClientsHandler } from './handlers/o-auth-delete-clients.handler';
import { OAuthFindClientByIdHandler } from './handlers/o-auth-find-client-by-id.handler';
import { OAuthFindClientHandler } from './handlers/o-auth-find-client.handler';
import { OAuthGetClientsHandler } from './handlers/o-auth-get-clients.handler';
import { OAuthPaginateClientsHandler } from './handlers/o-auth-paginate-clients.handler';
import { OAuthUpdateClientByIdHandler } from './handlers/o-auth-update-client-by-id.handler';

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
  OAuthDeleteClientByIdHandler,
  OAuthDeleteClientsHandler,
];

export const OAuthClientApiServices = [OAuthClientSeeder];
