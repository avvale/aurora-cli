// export commands
export { AuditingCreateHttpCommunicationCommand } from './application/create/auditing-create-http-communication.command';
export { AuditingCreateHttpCommunicationsCommand } from './application/create/auditing-create-http-communications.command';
export { AuditingDeleteHttpCommunicationByIdCommand } from './application/delete/auditing-delete-http-communication-by-id.command';
export { AuditingDeleteHttpCommunicationsCommand } from './application/delete/auditing-delete-http-communications.command';
export { AuditingUpdateHttpCommunicationByIdCommand } from './application/update/auditing-update-http-communication-by-id.command';
export { AuditingUpdateHttpCommunicationsCommand } from './application/update/auditing-update-http-communications.command';

// export queries
export { AuditingFindHttpCommunicationByIdQuery } from './application/find/auditing-find-http-communication-by-id.query';
export { AuditingFindHttpCommunicationQuery } from './application/find/auditing-find-http-communication.query';
export { AuditingGetHttpCommunicationsQuery } from './application/get/auditing-get-http-communications.query';
export { AuditingPaginateHttpCommunicationsQuery } from './application/paginate/auditing-paginate-http-communications.query';

// export mocks
export { auditingMockHttpCommunicationData } from './infrastructure/mock/auditing-mock-http-communication.data';
export { AuditingMockHttpCommunicationRepository } from './infrastructure/mock/auditing-mock-http-communication.repository';
export { AuditingMockHttpCommunicationSeeder } from './infrastructure/mock/auditing-mock-http-communication.seeder';

// export events
export { AuditingAddHttpCommunicationsContextEvent } from './application/events/auditing-add-http-communications-context.event';
export { AuditingCreatedHttpCommunicationEvent } from './application/events/auditing-created-http-communication.event';
export { AuditingCreatedHttpCommunicationsEvent } from './application/events/auditing-created-http-communications.event';
export { AuditingDeletedHttpCommunicationEvent } from './application/events/auditing-deleted-http-communication.event';
export { AuditingDeletedHttpCommunicationsEvent } from './application/events/auditing-deleted-http-communications.event';
export { AuditingUpdatedHttpCommunicationEvent } from './application/events/auditing-updated-http-communication.event';
export { AuditingUpdatedHttpCommunicationsEvent } from './application/events/auditing-updated-http-communications.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { AuditingHttpCommunication } from './domain/auditing-http-communication.aggregate';
export { AuditingHttpCommunicationMapper } from './domain/auditing-http-communication.mapper';
export { AuditingIHttpCommunicationRepository } from './domain/auditing-http-communication.repository';
export { AuditingHttpCommunicationResponse } from './domain/auditing-http-communication.response';

// infrastructure
export { AuditingHttpCommunicationModel } from './infrastructure/sequelize/auditing-sequelize-http-communication.model';
export { AuditingSequelizeHttpCommunicationRepository } from './infrastructure/sequelize/auditing-sequelize-http-communication.repository';

// sagas
export { AuditingHttpCommunicationSagas } from './application/sagas/auditing-http-communication.sagas';

// command handlers
import { AuditingCreateHttpCommunicationCommandHandler } from './application/create/auditing-create-http-communication.command-handler';
import { AuditingCreateHttpCommunicationsCommandHandler } from './application/create/auditing-create-http-communications.command-handler';
import { AuditingDeleteHttpCommunicationByIdCommandHandler } from './application/delete/auditing-delete-http-communication-by-id.command-handler';
import { AuditingDeleteHttpCommunicationsCommandHandler } from './application/delete/auditing-delete-http-communications.command-handler';
import { AuditingUpdateHttpCommunicationByIdCommandHandler } from './application/update/auditing-update-http-communication-by-id.command-handler';
import { AuditingUpdateHttpCommunicationsCommandHandler } from './application/update/auditing-update-http-communications.command-handler';

// query handlers
import { AuditingFindHttpCommunicationByIdQueryHandler } from './application/find/auditing-find-http-communication-by-id.query-handler';
import { AuditingFindHttpCommunicationQueryHandler } from './application/find/auditing-find-http-communication.query-handler';
import { AuditingGetHttpCommunicationsQueryHandler } from './application/get/auditing-get-http-communications.query-handler';
import { AuditingPaginateHttpCommunicationsQueryHandler } from './application/paginate/auditing-paginate-http-communications.query-handler';

// event handlers
import { AuditingCreatedHttpCommunicationEventHandler } from './application/events/auditing-created-http-communication.event-handler';
import { AuditingCreatedHttpCommunicationsEventHandler } from './application/events/auditing-created-http-communications.event-handler';
import { AuditingDeletedHttpCommunicationEventHandler } from './application/events/auditing-deleted-http-communication.event-handler';
import { AuditingDeletedHttpCommunicationsEventHandler } from './application/events/auditing-deleted-http-communications.event-handler';
import { AuditingUpdatedHttpCommunicationEventHandler } from './application/events/auditing-updated-http-communication.event-handler';
import { AuditingUpdatedHttpCommunicationsEventHandler } from './application/events/auditing-updated-http-communications.event-handler';

// services
import { AuditingCreateHttpCommunicationService } from './application/create/auditing-create-http-communication.service';
import { AuditingCreateHttpCommunicationsService } from './application/create/auditing-create-http-communications.service';
import { AuditingDeleteHttpCommunicationByIdService } from './application/delete/auditing-delete-http-communication-by-id.service';
import { AuditingDeleteHttpCommunicationsService } from './application/delete/auditing-delete-http-communications.service';
import { AuditingFindHttpCommunicationByIdService } from './application/find/auditing-find-http-communication-by-id.service';
import { AuditingFindHttpCommunicationService } from './application/find/auditing-find-http-communication.service';
import { AuditingGetHttpCommunicationsService } from './application/get/auditing-get-http-communications.service';
import { AuditingPaginateHttpCommunicationsService } from './application/paginate/auditing-paginate-http-communications.service';
import { AuditingUpdateHttpCommunicationByIdService } from './application/update/auditing-update-http-communication-by-id.service';
import { AuditingUpdateHttpCommunicationsService } from './application/update/auditing-update-http-communications.service';

export const AuditingHttpCommunicationHandlers = [
  // commands
  AuditingCreateHttpCommunicationCommandHandler,
  AuditingCreateHttpCommunicationsCommandHandler,
  AuditingUpdateHttpCommunicationByIdCommandHandler,
  AuditingUpdateHttpCommunicationsCommandHandler,
  AuditingDeleteHttpCommunicationByIdCommandHandler,
  AuditingDeleteHttpCommunicationsCommandHandler,

  // queries
  AuditingPaginateHttpCommunicationsQueryHandler,
  AuditingGetHttpCommunicationsQueryHandler,
  AuditingFindHttpCommunicationQueryHandler,
  AuditingFindHttpCommunicationByIdQueryHandler,

  // events
  AuditingCreatedHttpCommunicationEventHandler,
  AuditingCreatedHttpCommunicationsEventHandler,
  AuditingUpdatedHttpCommunicationEventHandler,
  AuditingUpdatedHttpCommunicationsEventHandler,
  AuditingDeletedHttpCommunicationEventHandler,
  AuditingDeletedHttpCommunicationsEventHandler,
];

export const AuditingHttpCommunicationServices = [
  AuditingCreateHttpCommunicationService,
  AuditingCreateHttpCommunicationsService,
  AuditingPaginateHttpCommunicationsService,
  AuditingGetHttpCommunicationsService,
  AuditingFindHttpCommunicationService,
  AuditingFindHttpCommunicationByIdService,
  AuditingUpdateHttpCommunicationByIdService,
  AuditingUpdateHttpCommunicationsService,
  AuditingDeleteHttpCommunicationByIdService,
  AuditingDeleteHttpCommunicationsService,
];
