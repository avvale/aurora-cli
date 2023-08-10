// export DTOs
export { OAuthApplicationDto } from './dto/o-auth-application.dto';
export { OAuthCreateApplicationDto } from './dto/o-auth-create-application.dto';
export { OAuthUpdateApplicationByIdDto } from './dto/o-auth-update-application-by-id.dto';
export { OAuthUpdateApplicationsDto } from './dto/o-auth-update-applications.dto';

// export handlers
export { OAuthCreateApplicationHandler } from './handlers/o-auth-create-application.handler';
export { OAuthCreateApplicationsHandler } from './handlers/o-auth-create-applications.handler';
export { OAuthPaginateApplicationsHandler } from './handlers/o-auth-paginate-applications.handler';
export { OAuthGetApplicationsHandler } from './handlers/o-auth-get-applications.handler';
export { OAuthFindApplicationByIdHandler } from './handlers/o-auth-find-application-by-id.handler';
export { OAuthFindApplicationHandler } from './handlers/o-auth-find-application.handler';
export { OAuthUpdateApplicationByIdHandler } from './handlers/o-auth-update-application-by-id.handler';
export { OAuthUpdateApplicationsHandler } from './handlers/o-auth-update-applications.handler';
export { OAuthUpsertApplicationHandler } from './handlers/o-auth-upsert-application.handler';
export { OAuthDeleteApplicationByIdHandler } from './handlers/o-auth-delete-application-by-id.handler';
export { OAuthDeleteApplicationsHandler } from './handlers/o-auth-delete-applications.handler';

// export controllers
export { OAuthCreateApplicationController } from './controllers/o-auth-create-application.controller';
export { OAuthCreateApplicationsController } from './controllers/o-auth-create-applications.controller';
export { OAuthPaginateApplicationsController } from './controllers/o-auth-paginate-applications.controller';
export { OAuthGetApplicationsController } from './controllers/o-auth-get-applications.controller';
export { OAuthFindApplicationByIdController } from './controllers/o-auth-find-application-by-id.controller';
export { OAuthFindApplicationController } from './controllers/o-auth-find-application.controller';
export { OAuthUpdateApplicationByIdController } from './controllers/o-auth-update-application-by-id.controller';
export { OAuthUpdateApplicationsController } from './controllers/o-auth-update-applications.controller';
export { OAuthUpsertApplicationController } from './controllers/o-auth-upsert-application.controller';
export { OAuthDeleteApplicationByIdController } from './controllers/o-auth-delete-application-by-id.controller';
export { OAuthDeleteApplicationsController } from './controllers/o-auth-delete-applications.controller';

// exports resolvers
export { OAuthCreateApplicationResolver } from './resolvers/o-auth-create-application.resolver';
export { OAuthCreateApplicationsResolver } from './resolvers/o-auth-create-applications.resolver';
export { OAuthPaginateApplicationsResolver } from './resolvers/o-auth-paginate-applications.resolver';
export { OAuthGetApplicationsResolver } from './resolvers/o-auth-get-applications.resolver';
export { OAuthFindApplicationByIdResolver } from './resolvers/o-auth-find-application-by-id.resolver';
export { OAuthFindApplicationResolver } from './resolvers/o-auth-find-application.resolver';
export { OAuthUpdateApplicationByIdResolver } from './resolvers/o-auth-update-application-by-id.resolver';
export { OAuthUpdateApplicationsResolver } from './resolvers/o-auth-update-applications.resolver';
export { OAuthUpsertApplicationResolver } from './resolvers/o-auth-upsert-application.resolver';
export { OAuthDeleteApplicationByIdResolver } from './resolvers/o-auth-delete-application-by-id.resolver';
export { OAuthDeleteApplicationsResolver } from './resolvers/o-auth-delete-applications.resolver';

// controllers
import { OAuthCreateApplicationController } from './controllers/o-auth-create-application.controller';
import { OAuthCreateApplicationsController } from './controllers/o-auth-create-applications.controller';
import { OAuthPaginateApplicationsController } from './controllers/o-auth-paginate-applications.controller';
import { OAuthGetApplicationsController } from './controllers/o-auth-get-applications.controller';
import { OAuthFindApplicationByIdController } from './controllers/o-auth-find-application-by-id.controller';
import { OAuthFindApplicationController } from './controllers/o-auth-find-application.controller';
import { OAuthUpdateApplicationByIdController } from './controllers/o-auth-update-application-by-id.controller';
import { OAuthUpdateApplicationsController } from './controllers/o-auth-update-applications.controller';
import { OAuthUpsertApplicationController } from './controllers/o-auth-upsert-application.controller';
import { OAuthDeleteApplicationByIdController } from './controllers/o-auth-delete-application-by-id.controller';
import { OAuthDeleteApplicationsController } from './controllers/o-auth-delete-applications.controller';

// resolvers
import { OAuthCreateApplicationResolver } from './resolvers/o-auth-create-application.resolver';
import { OAuthCreateApplicationsResolver } from './resolvers/o-auth-create-applications.resolver';
import { OAuthPaginateApplicationsResolver } from './resolvers/o-auth-paginate-applications.resolver';
import { OAuthGetApplicationsResolver } from './resolvers/o-auth-get-applications.resolver';
import { OAuthFindApplicationByIdResolver } from './resolvers/o-auth-find-application-by-id.resolver';
import { OAuthFindApplicationResolver } from './resolvers/o-auth-find-application.resolver';
import { OAuthUpdateApplicationByIdResolver } from './resolvers/o-auth-update-application-by-id.resolver';
import { OAuthUpdateApplicationsResolver } from './resolvers/o-auth-update-applications.resolver';
import { OAuthUpsertApplicationResolver } from './resolvers/o-auth-upsert-application.resolver';
import { OAuthDeleteApplicationByIdResolver } from './resolvers/o-auth-delete-application-by-id.resolver';
import { OAuthDeleteApplicationsResolver } from './resolvers/o-auth-delete-applications.resolver';

// handlers
import { OAuthCreateApplicationHandler } from './handlers/o-auth-create-application.handler';
import { OAuthCreateApplicationsHandler } from './handlers/o-auth-create-applications.handler';
import { OAuthPaginateApplicationsHandler } from './handlers/o-auth-paginate-applications.handler';
import { OAuthGetApplicationsHandler } from './handlers/o-auth-get-applications.handler';
import { OAuthFindApplicationByIdHandler } from './handlers/o-auth-find-application-by-id.handler';
import { OAuthFindApplicationHandler } from './handlers/o-auth-find-application.handler';
import { OAuthUpdateApplicationByIdHandler } from './handlers/o-auth-update-application-by-id.handler';
import { OAuthUpdateApplicationsHandler } from './handlers/o-auth-update-applications.handler';
import { OAuthUpsertApplicationHandler } from './handlers/o-auth-upsert-application.handler';
import { OAuthDeleteApplicationByIdHandler } from './handlers/o-auth-delete-application-by-id.handler';
import { OAuthDeleteApplicationsHandler } from './handlers/o-auth-delete-applications.handler';

// seeder
import { OAuthApplicationSeeder } from './seeder/o-auth-application.seeder';

export const OAuthApplicationControllers = [
    OAuthCreateApplicationController,
    OAuthCreateApplicationsController,
    OAuthPaginateApplicationsController,
    OAuthGetApplicationsController,
    OAuthFindApplicationByIdController,
    OAuthFindApplicationController,
    OAuthUpdateApplicationByIdController,
    OAuthUpdateApplicationsController,
    OAuthUpsertApplicationController,
    OAuthDeleteApplicationByIdController,
    OAuthDeleteApplicationsController,
];

export const OAuthApplicationResolvers = [
    OAuthCreateApplicationResolver,
    OAuthCreateApplicationsResolver,
    OAuthPaginateApplicationsResolver,
    OAuthGetApplicationsResolver,
    OAuthFindApplicationByIdResolver,
    OAuthFindApplicationResolver,
    OAuthUpdateApplicationByIdResolver,
    OAuthUpdateApplicationsResolver,
    OAuthUpsertApplicationResolver,
    OAuthDeleteApplicationByIdResolver,
    OAuthDeleteApplicationsResolver,
];

export const OAuthApplicationApiHandlers = [
    OAuthCreateApplicationHandler,
    OAuthCreateApplicationsHandler,
    OAuthPaginateApplicationsHandler,
    OAuthGetApplicationsHandler,
    OAuthFindApplicationByIdHandler,
    OAuthFindApplicationHandler,
    OAuthUpdateApplicationByIdHandler,
    OAuthUpdateApplicationsHandler,
    OAuthUpsertApplicationHandler,
    OAuthDeleteApplicationByIdHandler,
    OAuthDeleteApplicationsHandler,
];

export const OAuthApplicationServices = [
    OAuthApplicationSeeder,
];
