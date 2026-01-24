// export commands
export { ToolsCreateMigrationCommand } from './application/create/tools-create-migration.command';
export { ToolsCreateMigrationsCommand } from './application/create/tools-create-migrations.command';
export { ToolsDeleteMigrationByIdCommand } from './application/delete/tools-delete-migration-by-id.command';
export { ToolsDeleteMigrationsCommand } from './application/delete/tools-delete-migrations.command';
export { ToolsUpdateMigrationByIdCommand } from './application/update/tools-update-migration-by-id.command';
export { ToolsUpdateMigrationsCommand } from './application/update/tools-update-migrations.command';

// export queries
export { ToolsFindMigrationByIdQuery } from './application/find/tools-find-migration-by-id.query';
export { ToolsFindMigrationQuery } from './application/find/tools-find-migration.query';
export { ToolsGetMigrationsQuery } from './application/get/tools-get-migrations.query';
export { ToolsPaginateMigrationsQuery } from './application/paginate/tools-paginate-migrations.query';

// export mocks
export { toolsMockMigrationData } from './infrastructure/mock/tools-mock-migration.data';
export { ToolsMockMigrationRepository } from './infrastructure/mock/tools-mock-migration.repository';
export { ToolsMockMigrationSeeder } from './infrastructure/mock/tools-mock-migration.seeder';

// export events
export { ToolsAddMigrationsContextEvent } from './application/events/tools-add-migrations-context.event';
export { ToolsCreatedMigrationEvent } from './application/events/tools-created-migration.event';
export { ToolsCreatedMigrationsEvent } from './application/events/tools-created-migrations.event';
export { ToolsDeletedMigrationEvent } from './application/events/tools-deleted-migration.event';
export { ToolsDeletedMigrationsEvent } from './application/events/tools-deleted-migrations.event';
export { ToolsUpdatedMigrationEvent } from './application/events/tools-updated-migration.event';
export { ToolsUpdatedMigrationsEvent } from './application/events/tools-updated-migrations.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { ToolsMigration } from './domain/tools-migration.aggregate';
export { ToolsMigrationMapper } from './domain/tools-migration.mapper';
export { ToolsIMigrationRepository } from './domain/tools-migration.repository';
export { ToolsMigrationResponse } from './domain/tools-migration.response';

// infrastructure
export { ToolsMigrationModel } from './infrastructure/sequelize/tools-sequelize-migration.model';
export { ToolsSequelizeMigrationRepository } from './infrastructure/sequelize/tools-sequelize-migration.repository';

// sagas
export { ToolsMigrationSagas } from './application/sagas/tools-migration.sagas';

// command handlers
import { ToolsCreateMigrationCommandHandler } from './application/create/tools-create-migration.command-handler';
import { ToolsCreateMigrationsCommandHandler } from './application/create/tools-create-migrations.command-handler';
import { ToolsDeleteMigrationByIdCommandHandler } from './application/delete/tools-delete-migration-by-id.command-handler';
import { ToolsDeleteMigrationsCommandHandler } from './application/delete/tools-delete-migrations.command-handler';
import { ToolsUpdateMigrationByIdCommandHandler } from './application/update/tools-update-migration-by-id.command-handler';
import { ToolsUpdateMigrationsCommandHandler } from './application/update/tools-update-migrations.command-handler';

// query handlers
import { ToolsFindMigrationByIdQueryHandler } from './application/find/tools-find-migration-by-id.query-handler';
import { ToolsFindMigrationQueryHandler } from './application/find/tools-find-migration.query-handler';
import { ToolsGetMigrationsQueryHandler } from './application/get/tools-get-migrations.query-handler';
import { ToolsPaginateMigrationsQueryHandler } from './application/paginate/tools-paginate-migrations.query-handler';

// event handlers
import { ToolsCreatedMigrationEventHandler } from './application/events/tools-created-migration.event-handler';
import { ToolsCreatedMigrationsEventHandler } from './application/events/tools-created-migrations.event-handler';
import { ToolsDeletedMigrationEventHandler } from './application/events/tools-deleted-migration.event-handler';
import { ToolsDeletedMigrationsEventHandler } from './application/events/tools-deleted-migrations.event-handler';
import { ToolsUpdatedMigrationEventHandler } from './application/events/tools-updated-migration.event-handler';
import { ToolsUpdatedMigrationsEventHandler } from './application/events/tools-updated-migrations.event-handler';

// services
import { ToolsCreateMigrationService } from './application/create/tools-create-migration.service';
import { ToolsCreateMigrationsService } from './application/create/tools-create-migrations.service';
import { ToolsDeleteMigrationByIdService } from './application/delete/tools-delete-migration-by-id.service';
import { ToolsDeleteMigrationsService } from './application/delete/tools-delete-migrations.service';
import { ToolsFindMigrationByIdService } from './application/find/tools-find-migration-by-id.service';
import { ToolsFindMigrationService } from './application/find/tools-find-migration.service';
import { ToolsGetMigrationsService } from './application/get/tools-get-migrations.service';
import { ToolsPaginateMigrationsService } from './application/paginate/tools-paginate-migrations.service';
import { ToolsUpdateMigrationByIdService } from './application/update/tools-update-migration-by-id.service';
import { ToolsUpdateMigrationsService } from './application/update/tools-update-migrations.service';

export const ToolsMigrationHandlers = [
  // commands
  ToolsCreateMigrationCommandHandler,
  ToolsCreateMigrationsCommandHandler,
  ToolsUpdateMigrationByIdCommandHandler,
  ToolsUpdateMigrationsCommandHandler,
  ToolsDeleteMigrationByIdCommandHandler,
  ToolsDeleteMigrationsCommandHandler,

  // queries
  ToolsPaginateMigrationsQueryHandler,
  ToolsGetMigrationsQueryHandler,
  ToolsFindMigrationQueryHandler,
  ToolsFindMigrationByIdQueryHandler,

  // events
  ToolsCreatedMigrationEventHandler,
  ToolsCreatedMigrationsEventHandler,
  ToolsUpdatedMigrationEventHandler,
  ToolsUpdatedMigrationsEventHandler,
  ToolsDeletedMigrationEventHandler,
  ToolsDeletedMigrationsEventHandler,
];

export const ToolsMigrationServices = [
  ToolsCreateMigrationService,
  ToolsCreateMigrationsService,
  ToolsPaginateMigrationsService,
  ToolsGetMigrationsService,
  ToolsFindMigrationService,
  ToolsFindMigrationByIdService,
  ToolsUpdateMigrationByIdService,
  ToolsUpdateMigrationsService,
  ToolsDeleteMigrationByIdService,
  ToolsDeleteMigrationsService,
];
