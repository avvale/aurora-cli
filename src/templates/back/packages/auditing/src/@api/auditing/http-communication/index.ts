// controllers
import { AuditingCreateHttpCommunicationController } from './controllers/auditing-create-http-communication.controller';
import { AuditingCreateHttpCommunicationsController } from './controllers/auditing-create-http-communications.controller';
import { AuditingPaginateHttpCommunicationsController } from './controllers/auditing-paginate-http-communications.controller';
import { AuditingGetHttpCommunicationsController } from './controllers/auditing-get-http-communications.controller';
import { AuditingFindHttpCommunicationByIdController } from './controllers/auditing-find-http-communication-by-id.controller';
import { AuditingFindHttpCommunicationController } from './controllers/auditing-find-http-communication.controller';
import { AuditingUpdateHttpCommunicationByIdController } from './controllers/auditing-update-http-communication-by-id.controller';
import { AuditingUpdateHttpCommunicationsController } from './controllers/auditing-update-http-communications.controller';
import { AuditingUpsertHttpCommunicationController } from './controllers/auditing-upsert-http-communication.controller';
import { AuditingDeleteHttpCommunicationByIdController } from './controllers/auditing-delete-http-communication-by-id.controller';
import { AuditingDeleteHttpCommunicationsController } from './controllers/auditing-delete-http-communications.controller';

// resolvers
import { AuditingCreateHttpCommunicationResolver } from './resolvers/auditing-create-http-communication.resolver';
import { AuditingCreateHttpCommunicationsResolver } from './resolvers/auditing-create-http-communications.resolver';
import { AuditingPaginateHttpCommunicationsResolver } from './resolvers/auditing-paginate-http-communications.resolver';
import { AuditingGetHttpCommunicationsResolver } from './resolvers/auditing-get-http-communications.resolver';
import { AuditingFindHttpCommunicationByIdResolver } from './resolvers/auditing-find-http-communication-by-id.resolver';
import { AuditingFindHttpCommunicationResolver } from './resolvers/auditing-find-http-communication.resolver';
import { AuditingUpdateHttpCommunicationByIdResolver } from './resolvers/auditing-update-http-communication-by-id.resolver';
import { AuditingUpdateHttpCommunicationsResolver } from './resolvers/auditing-update-http-communications.resolver';
import { AuditingUpsertHttpCommunicationResolver } from './resolvers/auditing-upsert-http-communication.resolver';
import { AuditingDeleteHttpCommunicationByIdResolver } from './resolvers/auditing-delete-http-communication-by-id.resolver';
import { AuditingDeleteHttpCommunicationsResolver } from './resolvers/auditing-delete-http-communications.resolver';

// handlers
import { AuditingCreateHttpCommunicationHandler } from './handlers/auditing-create-http-communication.handler';
import { AuditingCreateHttpCommunicationsHandler } from './handlers/auditing-create-http-communications.handler';
import { AuditingPaginateHttpCommunicationsHandler } from './handlers/auditing-paginate-http-communications.handler';
import { AuditingGetHttpCommunicationsHandler } from './handlers/auditing-get-http-communications.handler';
import { AuditingFindHttpCommunicationByIdHandler } from './handlers/auditing-find-http-communication-by-id.handler';
import { AuditingFindHttpCommunicationHandler } from './handlers/auditing-find-http-communication.handler';
import { AuditingUpdateHttpCommunicationByIdHandler } from './handlers/auditing-update-http-communication-by-id.handler';
import { AuditingUpdateHttpCommunicationsHandler } from './handlers/auditing-update-http-communications.handler';
import { AuditingUpsertHttpCommunicationHandler } from './handlers/auditing-upsert-http-communication.handler';
import { AuditingDeleteHttpCommunicationByIdHandler } from './handlers/auditing-delete-http-communication-by-id.handler';
import { AuditingDeleteHttpCommunicationsHandler } from './handlers/auditing-delete-http-communications.handler';

// seeder
import { AuditingHttpCommunicationSeeder } from './seeder/auditing-http-communication.seeder';

export const AuditingHttpCommunicationControllers = [
    AuditingCreateHttpCommunicationController,
    AuditingCreateHttpCommunicationsController,
    AuditingPaginateHttpCommunicationsController,
    AuditingGetHttpCommunicationsController,
    AuditingFindHttpCommunicationByIdController,
    AuditingFindHttpCommunicationController,
    AuditingUpdateHttpCommunicationByIdController,
    AuditingUpdateHttpCommunicationsController,
    AuditingUpsertHttpCommunicationController,
    AuditingDeleteHttpCommunicationByIdController,
    AuditingDeleteHttpCommunicationsController,
];

export const AuditingHttpCommunicationResolvers = [
    AuditingCreateHttpCommunicationResolver,
    AuditingCreateHttpCommunicationsResolver,
    AuditingPaginateHttpCommunicationsResolver,
    AuditingGetHttpCommunicationsResolver,
    AuditingFindHttpCommunicationByIdResolver,
    AuditingFindHttpCommunicationResolver,
    AuditingUpdateHttpCommunicationByIdResolver,
    AuditingUpdateHttpCommunicationsResolver,
    AuditingUpsertHttpCommunicationResolver,
    AuditingDeleteHttpCommunicationByIdResolver,
    AuditingDeleteHttpCommunicationsResolver,
];

export const AuditingHttpCommunicationApiHandlers = [
    AuditingCreateHttpCommunicationHandler,
    AuditingCreateHttpCommunicationsHandler,
    AuditingPaginateHttpCommunicationsHandler,
    AuditingGetHttpCommunicationsHandler,
    AuditingFindHttpCommunicationByIdHandler,
    AuditingFindHttpCommunicationHandler,
    AuditingUpdateHttpCommunicationByIdHandler,
    AuditingUpdateHttpCommunicationsHandler,
    AuditingUpsertHttpCommunicationHandler,
    AuditingDeleteHttpCommunicationByIdHandler,
    AuditingDeleteHttpCommunicationsHandler,
];

export const AuditingHttpCommunicationServices = [
    AuditingHttpCommunicationSeeder,
];