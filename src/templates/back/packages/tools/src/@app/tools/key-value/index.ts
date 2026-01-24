// export commands
export { ToolsCreateKeyValueCommand } from './application/create/tools-create-key-value.command';
export { ToolsCreateKeyValuesCommand } from './application/create/tools-create-key-values.command';
export { ToolsDeleteKeyValueByIdCommand } from './application/delete/tools-delete-key-value-by-id.command';
export { ToolsDeleteKeyValuesCommand } from './application/delete/tools-delete-key-values.command';
export { ToolsUpdateKeyValueByIdCommand } from './application/update/tools-update-key-value-by-id.command';

// export queries
export { ToolsFindKeyValueByIdQuery } from './application/find/tools-find-key-value-by-id.query';
export { ToolsFindKeyValueQuery } from './application/find/tools-find-key-value.query';
export { ToolsGetKeyValuesQuery } from './application/get/tools-get-key-values.query';
export { ToolsPaginateKeyValuesQuery } from './application/paginate/tools-paginate-key-values.query';

// export mocks
export { toolsMockKeyValueData } from './infrastructure/mock/tools-mock-key-value.data';
export { ToolsMockKeyValueRepository } from './infrastructure/mock/tools-mock-key-value.repository';
export { ToolsMockKeyValueSeeder } from './infrastructure/mock/tools-mock-key-value.seeder';

// export events
export { ToolsAddKeyValuesContextEvent } from './application/events/tools-add-key-values-context.event';
export { ToolsCreatedKeyValueEvent } from './application/events/tools-created-key-value.event';
export { ToolsCreatedKeyValuesEvent } from './application/events/tools-created-key-values.event';
export { ToolsDeletedKeyValueEvent } from './application/events/tools-deleted-key-value.event';
export { ToolsDeletedKeyValuesEvent } from './application/events/tools-deleted-key-values.event';
export { ToolsUpdatedKeyValueEvent } from './application/events/tools-updated-key-value.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { ToolsKeyValue } from './domain/tools-key-value.aggregate';
export { ToolsKeyValueMapper } from './domain/tools-key-value.mapper';
export { ToolsIKeyValueRepository } from './domain/tools-key-value.repository';
export { ToolsKeyValueResponse } from './domain/tools-key-value.response';

// infrastructure
export { ToolsKeyValueModel } from './infrastructure/sequelize/tools-sequelize-key-value.model';
export { ToolsSequelizeKeyValueRepository } from './infrastructure/sequelize/tools-sequelize-key-value.repository';

// sagas
export { ToolsKeyValueSagas } from './application/sagas/tools-key-value.sagas';

// command handlers
import { ToolsCreateKeyValueCommandHandler } from './application/create/tools-create-key-value.command-handler';
import { ToolsCreateKeyValuesCommandHandler } from './application/create/tools-create-key-values.command-handler';
import { ToolsDeleteKeyValueByIdCommandHandler } from './application/delete/tools-delete-key-value-by-id.command-handler';
import { ToolsDeleteKeyValuesCommandHandler } from './application/delete/tools-delete-key-values.command-handler';
import { ToolsUpdateKeyValueByIdCommandHandler } from './application/update/tools-update-key-value-by-id.command-handler';

// query handlers
import { ToolsFindKeyValueByIdQueryHandler } from './application/find/tools-find-key-value-by-id.query-handler';
import { ToolsFindKeyValueQueryHandler } from './application/find/tools-find-key-value.query-handler';
import { ToolsGetKeyValuesQueryHandler } from './application/get/tools-get-key-values.query-handler';
import { ToolsPaginateKeyValuesQueryHandler } from './application/paginate/tools-paginate-key-values.query-handler';

// event handlers
import { ToolsCreatedKeyValueEventHandler } from './application/events/tools-created-key-value.event-handler';
import { ToolsCreatedKeyValuesEventHandler } from './application/events/tools-created-key-values.event-handler';
import { ToolsDeletedKeyValueEventHandler } from './application/events/tools-deleted-key-value.event-handler';
import { ToolsDeletedKeyValuesEventHandler } from './application/events/tools-deleted-key-values.event-handler';
import { ToolsUpdatedKeyValueEventHandler } from './application/events/tools-updated-key-value.event-handler';

// services
import { ToolsCreateKeyValueService } from './application/create/tools-create-key-value.service';
import { ToolsCreateKeyValuesService } from './application/create/tools-create-key-values.service';
import { ToolsDeleteKeyValueByIdService } from './application/delete/tools-delete-key-value-by-id.service';
import { ToolsDeleteKeyValuesService } from './application/delete/tools-delete-key-values.service';
import { ToolsFindKeyValueByIdService } from './application/find/tools-find-key-value-by-id.service';
import { ToolsFindKeyValueService } from './application/find/tools-find-key-value.service';
import { ToolsGetKeyValuesService } from './application/get/tools-get-key-values.service';
import { ToolsPaginateKeyValuesService } from './application/paginate/tools-paginate-key-values.service';
import { ToolsUpdateKeyValueByIdService } from './application/update/tools-update-key-value-by-id.service';

export const ToolsKeyValueHandlers = [
  // commands
  ToolsCreateKeyValueCommandHandler,
  ToolsCreateKeyValuesCommandHandler,
  ToolsUpdateKeyValueByIdCommandHandler,
  ToolsDeleteKeyValueByIdCommandHandler,
  ToolsDeleteKeyValuesCommandHandler,

  // queries
  ToolsPaginateKeyValuesQueryHandler,
  ToolsGetKeyValuesQueryHandler,
  ToolsFindKeyValueQueryHandler,
  ToolsFindKeyValueByIdQueryHandler,

  // events
  ToolsCreatedKeyValueEventHandler,
  ToolsCreatedKeyValuesEventHandler,
  ToolsUpdatedKeyValueEventHandler,
  ToolsDeletedKeyValueEventHandler,
  ToolsDeletedKeyValuesEventHandler,
];

export const ToolsKeyValueServices = [
  ToolsCreateKeyValueService,
  ToolsCreateKeyValuesService,
  ToolsPaginateKeyValuesService,
  ToolsGetKeyValuesService,
  ToolsFindKeyValueService,
  ToolsFindKeyValueByIdService,
  ToolsUpdateKeyValueByIdService,
  ToolsDeleteKeyValueByIdService,
  ToolsDeleteKeyValuesService,
];
