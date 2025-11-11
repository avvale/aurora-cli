// export DTOs
export { OAuthApplicationClientDto } from './dto/o-auth-application-client.dto';
export { OAuthCreateApplicationClientDto } from './dto/o-auth-create-application-client.dto';
export { OAuthUpdateApplicationClientByIdDto } from './dto/o-auth-update-application-client-by-id.dto';
export { OAuthUpdateApplicationsClientsDto } from './dto/o-auth-update-applications-clients.dto';

// export handlers
export { OAuthCreateApplicationClientHandler } from './handlers/o-auth-create-application-client.handler';
export { OAuthCreateApplicationsClientsHandler } from './handlers/o-auth-create-applications-clients.handler';
export { OAuthDeleteApplicationClientByIdHandler } from './handlers/o-auth-delete-application-client-by-id.handler';
export { OAuthDeleteApplicationsClientsHandler } from './handlers/o-auth-delete-applications-clients.handler';
export { OAuthFindApplicationClientByIdHandler } from './handlers/o-auth-find-application-client-by-id.handler';
export { OAuthFindApplicationClientHandler } from './handlers/o-auth-find-application-client.handler';
export { OAuthGetApplicationsClientsHandler } from './handlers/o-auth-get-applications-clients.handler';
export { OAuthPaginateApplicationsClientsHandler } from './handlers/o-auth-paginate-applications-clients.handler';
export { OAuthUpdateApplicationClientByIdHandler } from './handlers/o-auth-update-application-client-by-id.handler';

// export controllers
export { OAuthCreateApplicationClientController } from './controllers/o-auth-create-application-client.controller';
export { OAuthCreateApplicationsClientsController } from './controllers/o-auth-create-applications-clients.controller';
export { OAuthDeleteApplicationClientByIdController } from './controllers/o-auth-delete-application-client-by-id.controller';
export { OAuthDeleteApplicationsClientsController } from './controllers/o-auth-delete-applications-clients.controller';
export { OAuthFindApplicationClientByIdController } from './controllers/o-auth-find-application-client-by-id.controller';
export { OAuthFindApplicationClientController } from './controllers/o-auth-find-application-client.controller';
export { OAuthGetApplicationsClientsController } from './controllers/o-auth-get-applications-clients.controller';
export { OAuthPaginateApplicationsClientsController } from './controllers/o-auth-paginate-applications-clients.controller';
export { OAuthUpdateApplicationClientByIdController } from './controllers/o-auth-update-application-client-by-id.controller';

// export resolvers
export { OAuthCreateApplicationClientResolver } from './resolvers/o-auth-create-application-client.resolver';
export { OAuthCreateApplicationsClientsResolver } from './resolvers/o-auth-create-applications-clients.resolver';
export { OAuthDeleteApplicationClientByIdResolver } from './resolvers/o-auth-delete-application-client-by-id.resolver';
export { OAuthDeleteApplicationsClientsResolver } from './resolvers/o-auth-delete-applications-clients.resolver';
export { OAuthFindApplicationClientByIdResolver } from './resolvers/o-auth-find-application-client-by-id.resolver';
export { OAuthFindApplicationClientResolver } from './resolvers/o-auth-find-application-client.resolver';
export { OAuthGetApplicationsClientsResolver } from './resolvers/o-auth-get-applications-clients.resolver';
export { OAuthPaginateApplicationsClientsResolver } from './resolvers/o-auth-paginate-applications-clients.resolver';
export { OAuthUpdateApplicationClientByIdResolver } from './resolvers/o-auth-update-application-client-by-id.resolver';

// import controllers
import { OAuthCreateApplicationClientController } from './controllers/o-auth-create-application-client.controller';
import { OAuthCreateApplicationsClientsController } from './controllers/o-auth-create-applications-clients.controller';
import { OAuthDeleteApplicationClientByIdController } from './controllers/o-auth-delete-application-client-by-id.controller';
import { OAuthDeleteApplicationsClientsController } from './controllers/o-auth-delete-applications-clients.controller';
import { OAuthFindApplicationClientByIdController } from './controllers/o-auth-find-application-client-by-id.controller';
import { OAuthFindApplicationClientController } from './controllers/o-auth-find-application-client.controller';
import { OAuthGetApplicationsClientsController } from './controllers/o-auth-get-applications-clients.controller';
import { OAuthPaginateApplicationsClientsController } from './controllers/o-auth-paginate-applications-clients.controller';
import { OAuthUpdateApplicationClientByIdController } from './controllers/o-auth-update-application-client-by-id.controller';

// import resolvers
import { OAuthCreateApplicationClientResolver } from './resolvers/o-auth-create-application-client.resolver';
import { OAuthCreateApplicationsClientsResolver } from './resolvers/o-auth-create-applications-clients.resolver';
import { OAuthDeleteApplicationClientByIdResolver } from './resolvers/o-auth-delete-application-client-by-id.resolver';
import { OAuthDeleteApplicationsClientsResolver } from './resolvers/o-auth-delete-applications-clients.resolver';
import { OAuthFindApplicationClientByIdResolver } from './resolvers/o-auth-find-application-client-by-id.resolver';
import { OAuthFindApplicationClientResolver } from './resolvers/o-auth-find-application-client.resolver';
import { OAuthGetApplicationsClientsResolver } from './resolvers/o-auth-get-applications-clients.resolver';
import { OAuthPaginateApplicationsClientsResolver } from './resolvers/o-auth-paginate-applications-clients.resolver';
import { OAuthUpdateApplicationClientByIdResolver } from './resolvers/o-auth-update-application-client-by-id.resolver';

// import handlers
import { OAuthCreateApplicationClientHandler } from './handlers/o-auth-create-application-client.handler';
import { OAuthCreateApplicationsClientsHandler } from './handlers/o-auth-create-applications-clients.handler';
import { OAuthDeleteApplicationClientByIdHandler } from './handlers/o-auth-delete-application-client-by-id.handler';
import { OAuthDeleteApplicationsClientsHandler } from './handlers/o-auth-delete-applications-clients.handler';
import { OAuthFindApplicationClientByIdHandler } from './handlers/o-auth-find-application-client-by-id.handler';
import { OAuthFindApplicationClientHandler } from './handlers/o-auth-find-application-client.handler';
import { OAuthGetApplicationsClientsHandler } from './handlers/o-auth-get-applications-clients.handler';
import { OAuthPaginateApplicationsClientsHandler } from './handlers/o-auth-paginate-applications-clients.handler';
import { OAuthUpdateApplicationClientByIdHandler } from './handlers/o-auth-update-application-client-by-id.handler';

// import seeder
import { OAuthApplicationClientSeeder } from './seeder/o-auth-application-client.seeder';

export const OAuthApplicationClientApiControllers = [
    OAuthCreateApplicationClientController,
    OAuthCreateApplicationsClientsController,
    OAuthPaginateApplicationsClientsController,
    OAuthGetApplicationsClientsController,
    OAuthFindApplicationClientByIdController,
    OAuthFindApplicationClientController,
    OAuthUpdateApplicationClientByIdController,
    OAuthDeleteApplicationClientByIdController,
    OAuthDeleteApplicationsClientsController,
];

export const OAuthApplicationClientApiResolvers = [
    OAuthCreateApplicationClientResolver,
    OAuthCreateApplicationsClientsResolver,
    OAuthPaginateApplicationsClientsResolver,
    OAuthGetApplicationsClientsResolver,
    OAuthFindApplicationClientByIdResolver,
    OAuthFindApplicationClientResolver,
    OAuthUpdateApplicationClientByIdResolver,
    OAuthDeleteApplicationClientByIdResolver,
    OAuthDeleteApplicationsClientsResolver,
];

export const OAuthApplicationClientApiHandlers = [
    OAuthCreateApplicationClientHandler,
    OAuthCreateApplicationsClientsHandler,
    OAuthPaginateApplicationsClientsHandler,
    OAuthGetApplicationsClientsHandler,
    OAuthFindApplicationClientByIdHandler,
    OAuthFindApplicationClientHandler,
    OAuthUpdateApplicationClientByIdHandler,
    OAuthDeleteApplicationClientByIdHandler,
    OAuthDeleteApplicationsClientsHandler,
];

export const OAuthApplicationClientApiServices = [OAuthApplicationClientSeeder];
