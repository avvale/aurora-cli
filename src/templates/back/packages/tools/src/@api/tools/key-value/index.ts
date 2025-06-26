// export DTOs
export { ToolsKeyValueDto } from './dto/tools-key-value.dto';
export { ToolsCreateKeyValueDto } from './dto/tools-create-key-value.dto';
export { ToolsUpdateKeyValueByIdDto } from './dto/tools-update-key-value-by-id.dto';
export { ToolsUpdateKeyValuesDto } from './dto/tools-update-key-values.dto';

// export handlers
export { ToolsCreateKeyValueHandler } from './handlers/tools-create-key-value.handler';
export { ToolsCreateKeyValuesHandler } from './handlers/tools-create-key-values.handler';
export { ToolsPaginateKeyValuesHandler } from './handlers/tools-paginate-key-values.handler';
export { ToolsGetKeyValuesHandler } from './handlers/tools-get-key-values.handler';
export { ToolsFindKeyValueByIdHandler } from './handlers/tools-find-key-value-by-id.handler';
export { ToolsFindKeyValueHandler } from './handlers/tools-find-key-value.handler';
export { ToolsUpdateKeyValueByIdHandler } from './handlers/tools-update-key-value-by-id.handler';
export { ToolsUpdateKeyValuesHandler } from './handlers/tools-update-key-values.handler';
export { ToolsDeleteKeyValueByIdHandler } from './handlers/tools-delete-key-value-by-id.handler';
export { ToolsDeleteKeyValuesHandler } from './handlers/tools-delete-key-values.handler';

// export controllers
export { ToolsCreateKeyValueController } from './controllers/tools-create-key-value.controller';
export { ToolsCreateKeyValuesController } from './controllers/tools-create-key-values.controller';
export { ToolsPaginateKeyValuesController } from './controllers/tools-paginate-key-values.controller';
export { ToolsGetKeyValuesController } from './controllers/tools-get-key-values.controller';
export { ToolsFindKeyValueByIdController } from './controllers/tools-find-key-value-by-id.controller';
export { ToolsFindKeyValueController } from './controllers/tools-find-key-value.controller';
export { ToolsUpdateKeyValueByIdController } from './controllers/tools-update-key-value-by-id.controller';
export { ToolsUpdateKeyValuesController } from './controllers/tools-update-key-values.controller';
export { ToolsDeleteKeyValueByIdController } from './controllers/tools-delete-key-value-by-id.controller';
export { ToolsDeleteKeyValuesController } from './controllers/tools-delete-key-values.controller';

// export resolvers
export { ToolsCreateKeyValueResolver } from './resolvers/tools-create-key-value.resolver';
export { ToolsCreateKeyValuesResolver } from './resolvers/tools-create-key-values.resolver';
export { ToolsPaginateKeyValuesResolver } from './resolvers/tools-paginate-key-values.resolver';
export { ToolsGetKeyValuesResolver } from './resolvers/tools-get-key-values.resolver';
export { ToolsFindKeyValueByIdResolver } from './resolvers/tools-find-key-value-by-id.resolver';
export { ToolsFindKeyValueResolver } from './resolvers/tools-find-key-value.resolver';
export { ToolsUpdateKeyValueByIdResolver } from './resolvers/tools-update-key-value-by-id.resolver';
export { ToolsUpdateKeyValuesResolver } from './resolvers/tools-update-key-values.resolver';
export { ToolsDeleteKeyValueByIdResolver } from './resolvers/tools-delete-key-value-by-id.resolver';
export { ToolsDeleteKeyValuesResolver } from './resolvers/tools-delete-key-values.resolver';

// import controllers
import { ToolsCreateKeyValueController } from './controllers/tools-create-key-value.controller';
import { ToolsCreateKeyValuesController } from './controllers/tools-create-key-values.controller';
import { ToolsPaginateKeyValuesController } from './controllers/tools-paginate-key-values.controller';
import { ToolsGetKeyValuesController } from './controllers/tools-get-key-values.controller';
import { ToolsFindKeyValueByIdController } from './controllers/tools-find-key-value-by-id.controller';
import { ToolsFindKeyValueController } from './controllers/tools-find-key-value.controller';
import { ToolsUpdateKeyValueByIdController } from './controllers/tools-update-key-value-by-id.controller';
import { ToolsUpdateKeyValuesController } from './controllers/tools-update-key-values.controller';
import { ToolsDeleteKeyValueByIdController } from './controllers/tools-delete-key-value-by-id.controller';
import { ToolsDeleteKeyValuesController } from './controllers/tools-delete-key-values.controller';

// import resolvers
import { ToolsCreateKeyValueResolver } from './resolvers/tools-create-key-value.resolver';
import { ToolsCreateKeyValuesResolver } from './resolvers/tools-create-key-values.resolver';
import { ToolsPaginateKeyValuesResolver } from './resolvers/tools-paginate-key-values.resolver';
import { ToolsGetKeyValuesResolver } from './resolvers/tools-get-key-values.resolver';
import { ToolsFindKeyValueByIdResolver } from './resolvers/tools-find-key-value-by-id.resolver';
import { ToolsFindKeyValueResolver } from './resolvers/tools-find-key-value.resolver';
import { ToolsUpdateKeyValueByIdResolver } from './resolvers/tools-update-key-value-by-id.resolver';
import { ToolsUpdateKeyValuesResolver } from './resolvers/tools-update-key-values.resolver';
import { ToolsDeleteKeyValueByIdResolver } from './resolvers/tools-delete-key-value-by-id.resolver';
import { ToolsDeleteKeyValuesResolver } from './resolvers/tools-delete-key-values.resolver';

// import handlers
import { ToolsCreateKeyValueHandler } from './handlers/tools-create-key-value.handler';
import { ToolsCreateKeyValuesHandler } from './handlers/tools-create-key-values.handler';
import { ToolsPaginateKeyValuesHandler } from './handlers/tools-paginate-key-values.handler';
import { ToolsGetKeyValuesHandler } from './handlers/tools-get-key-values.handler';
import { ToolsFindKeyValueByIdHandler } from './handlers/tools-find-key-value-by-id.handler';
import { ToolsFindKeyValueHandler } from './handlers/tools-find-key-value.handler';
import { ToolsUpdateKeyValueByIdHandler } from './handlers/tools-update-key-value-by-id.handler';
import { ToolsUpdateKeyValuesHandler } from './handlers/tools-update-key-values.handler';
import { ToolsDeleteKeyValueByIdHandler } from './handlers/tools-delete-key-value-by-id.handler';
import { ToolsDeleteKeyValuesHandler } from './handlers/tools-delete-key-values.handler';

// import seeder
import { ToolsKeyValueSeeder } from './seeder/tools-key-value.seeder';

export const ToolsKeyValueApiControllers = [
    ToolsCreateKeyValueController,
    ToolsCreateKeyValuesController,
    ToolsPaginateKeyValuesController,
    ToolsGetKeyValuesController,
    ToolsFindKeyValueByIdController,
    ToolsFindKeyValueController,
    ToolsUpdateKeyValueByIdController,
    ToolsUpdateKeyValuesController,
    ToolsDeleteKeyValueByIdController,
    ToolsDeleteKeyValuesController,
];

export const ToolsKeyValueApiResolvers = [
    ToolsCreateKeyValueResolver,
    ToolsCreateKeyValuesResolver,
    ToolsPaginateKeyValuesResolver,
    ToolsGetKeyValuesResolver,
    ToolsFindKeyValueByIdResolver,
    ToolsFindKeyValueResolver,
    ToolsUpdateKeyValueByIdResolver,
    ToolsUpdateKeyValuesResolver,
    ToolsDeleteKeyValueByIdResolver,
    ToolsDeleteKeyValuesResolver,
];

export const ToolsKeyValueApiHandlers = [
    ToolsCreateKeyValueHandler,
    ToolsCreateKeyValuesHandler,
    ToolsPaginateKeyValuesHandler,
    ToolsGetKeyValuesHandler,
    ToolsFindKeyValueByIdHandler,
    ToolsFindKeyValueHandler,
    ToolsUpdateKeyValueByIdHandler,
    ToolsUpdateKeyValuesHandler,
    ToolsDeleteKeyValueByIdHandler,
    ToolsDeleteKeyValuesHandler,
];

export const ToolsKeyValueApiServices = [
    ToolsKeyValueSeeder,
];
