// export DTOs
export { CommonCreateResourceDto } from './dto/common-create-resource.dto';
export { CommonResourceDto } from './dto/common-resource.dto';
export { CommonUpdateResourceByIdDto } from './dto/common-update-resource-by-id.dto';
export { CommonUpdateResourcesDto } from './dto/common-update-resources.dto';

// export handlers
export { CommonCreateResourceHandler } from './handlers/common-create-resource.handler';
export { CommonCreateResourcesHandler } from './handlers/common-create-resources.handler';
export { CommonDeleteResourceByIdHandler } from './handlers/common-delete-resource-by-id.handler';
export { CommonDeleteResourcesHandler } from './handlers/common-delete-resources.handler';
export { CommonFindResourceByIdHandler } from './handlers/common-find-resource-by-id.handler';
export { CommonFindResourceHandler } from './handlers/common-find-resource.handler';
export { CommonGetResourcesHandler } from './handlers/common-get-resources.handler';
export { CommonPaginateResourcesHandler } from './handlers/common-paginate-resources.handler';
export { CommonUpdateResourceByIdHandler } from './handlers/common-update-resource-by-id.handler';
export { CommonUpdateResourcesHandler } from './handlers/common-update-resources.handler';
export { CommonUpsertResourceHandler } from './handlers/common-upsert-resource.handler';

// export controllers
export { CommonCreateResourceController } from './controllers/common-create-resource.controller';
export { CommonCreateResourcesController } from './controllers/common-create-resources.controller';
export { CommonDeleteResourceByIdController } from './controllers/common-delete-resource-by-id.controller';
export { CommonDeleteResourcesController } from './controllers/common-delete-resources.controller';
export { CommonFindResourceByIdController } from './controllers/common-find-resource-by-id.controller';
export { CommonFindResourceController } from './controllers/common-find-resource.controller';
export { CommonGetResourcesController } from './controllers/common-get-resources.controller';
export { CommonPaginateResourcesController } from './controllers/common-paginate-resources.controller';
export { CommonUpdateResourceByIdController } from './controllers/common-update-resource-by-id.controller';
export { CommonUpdateResourcesController } from './controllers/common-update-resources.controller';
export { CommonUpsertResourceController } from './controllers/common-upsert-resource.controller';

// export resolvers
export { CommonCreateResourceResolver } from './resolvers/common-create-resource.resolver';
export { CommonCreateResourcesResolver } from './resolvers/common-create-resources.resolver';
export { CommonDeleteResourceByIdResolver } from './resolvers/common-delete-resource-by-id.resolver';
export { CommonDeleteResourcesResolver } from './resolvers/common-delete-resources.resolver';
export { CommonFindResourceByIdResolver } from './resolvers/common-find-resource-by-id.resolver';
export { CommonFindResourceResolver } from './resolvers/common-find-resource.resolver';
export { CommonGetResourcesResolver } from './resolvers/common-get-resources.resolver';
export { CommonPaginateResourcesResolver } from './resolvers/common-paginate-resources.resolver';
export { CommonUpdateResourceByIdResolver } from './resolvers/common-update-resource-by-id.resolver';
export { CommonUpdateResourcesResolver } from './resolvers/common-update-resources.resolver';
export { CommonUpsertResourceResolver } from './resolvers/common-upsert-resource.resolver';

// import controllers
import { CommonCreateResourceController } from './controllers/common-create-resource.controller';
import { CommonCreateResourcesController } from './controllers/common-create-resources.controller';
import { CommonDeleteResourceByIdController } from './controllers/common-delete-resource-by-id.controller';
import { CommonDeleteResourcesController } from './controllers/common-delete-resources.controller';
import { CommonFindResourceByIdController } from './controllers/common-find-resource-by-id.controller';
import { CommonFindResourceController } from './controllers/common-find-resource.controller';
import { CommonGetResourcesController } from './controllers/common-get-resources.controller';
import { CommonPaginateResourcesController } from './controllers/common-paginate-resources.controller';
import { CommonUpdateResourceByIdController } from './controllers/common-update-resource-by-id.controller';
import { CommonUpdateResourcesController } from './controllers/common-update-resources.controller';
import { CommonUpsertResourceController } from './controllers/common-upsert-resource.controller';

// import resolvers
import { CommonCreateResourceResolver } from './resolvers/common-create-resource.resolver';
import { CommonCreateResourcesResolver } from './resolvers/common-create-resources.resolver';
import { CommonDeleteResourceByIdResolver } from './resolvers/common-delete-resource-by-id.resolver';
import { CommonDeleteResourcesResolver } from './resolvers/common-delete-resources.resolver';
import { CommonFindResourceByIdResolver } from './resolvers/common-find-resource-by-id.resolver';
import { CommonFindResourceResolver } from './resolvers/common-find-resource.resolver';
import { CommonGetResourcesResolver } from './resolvers/common-get-resources.resolver';
import { CommonPaginateResourcesResolver } from './resolvers/common-paginate-resources.resolver';
import { CommonUpdateResourceByIdResolver } from './resolvers/common-update-resource-by-id.resolver';
import { CommonUpdateResourcesResolver } from './resolvers/common-update-resources.resolver';
import { CommonUpsertResourceResolver } from './resolvers/common-upsert-resource.resolver';

// import handlers
import { CommonCreateResourceHandler } from './handlers/common-create-resource.handler';
import { CommonCreateResourcesHandler } from './handlers/common-create-resources.handler';
import { CommonDeleteResourceByIdHandler } from './handlers/common-delete-resource-by-id.handler';
import { CommonDeleteResourcesHandler } from './handlers/common-delete-resources.handler';
import { CommonFindResourceByIdHandler } from './handlers/common-find-resource-by-id.handler';
import { CommonFindResourceHandler } from './handlers/common-find-resource.handler';
import { CommonGetResourcesHandler } from './handlers/common-get-resources.handler';
import { CommonPaginateResourcesHandler } from './handlers/common-paginate-resources.handler';
import { CommonUpdateResourceByIdHandler } from './handlers/common-update-resource-by-id.handler';
import { CommonUpdateResourcesHandler } from './handlers/common-update-resources.handler';
import { CommonUpsertResourceHandler } from './handlers/common-upsert-resource.handler';

// import seeder
import { CommonResourceSeeder } from './seeder/common-resource.seeder';

export const CommonResourceApiControllers = [
  CommonCreateResourceController,
  CommonCreateResourcesController,
  CommonPaginateResourcesController,
  CommonGetResourcesController,
  CommonFindResourceByIdController,
  CommonFindResourceController,
  CommonUpdateResourceByIdController,
  CommonUpdateResourcesController,
  CommonUpsertResourceController,
  CommonDeleteResourceByIdController,
  CommonDeleteResourcesController,
];

export const CommonResourceApiResolvers = [
  CommonCreateResourceResolver,
  CommonCreateResourcesResolver,
  CommonPaginateResourcesResolver,
  CommonGetResourcesResolver,
  CommonFindResourceByIdResolver,
  CommonFindResourceResolver,
  CommonUpdateResourceByIdResolver,
  CommonUpdateResourcesResolver,
  CommonUpsertResourceResolver,
  CommonDeleteResourceByIdResolver,
  CommonDeleteResourcesResolver,
];

export const CommonResourceApiHandlers = [
  CommonCreateResourceHandler,
  CommonCreateResourcesHandler,
  CommonPaginateResourcesHandler,
  CommonGetResourcesHandler,
  CommonFindResourceByIdHandler,
  CommonFindResourceHandler,
  CommonUpdateResourceByIdHandler,
  CommonUpdateResourcesHandler,
  CommonUpsertResourceHandler,
  CommonDeleteResourceByIdHandler,
  CommonDeleteResourcesHandler,
];

export const CommonResourceApiServices = [CommonResourceSeeder];
