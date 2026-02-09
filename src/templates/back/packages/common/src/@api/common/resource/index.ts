/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
// export DTOs
export { CommonCreateResourceDto } from './dto/common-create-resource.dto';
export { CommonResourceDto } from './dto/common-resource.dto';
export { CommonUpdateResourceByIdDto } from './dto/common-update-resource-by-id.dto';
export { CommonUpdateResourcesDto } from './dto/common-update-resources.dto';

// export handlers
export { CommonCreateResourceHandler } from './handlers/common-create-resource.handler';
export { CommonDeleteResourceByIdHandler } from './handlers/common-delete-resource-by-id.handler';
export { CommonFindResourceByIdHandler } from './handlers/common-find-resource-by-id.handler';
export { CommonFindResourceHandler } from './handlers/common-find-resource.handler';
export { CommonGetResourcesHandler } from './handlers/common-get-resources.handler';
export { CommonPaginateResourcesHandler } from './handlers/common-paginate-resources.handler';
export { CommonUpdateResourceByIdHandler } from './handlers/common-update-resource-by-id.handler';

// export controllers
export { CommonCreateResourceController } from './controllers/common-create-resource.controller';
export { CommonDeleteResourceByIdController } from './controllers/common-delete-resource-by-id.controller';
export { CommonFindResourceByIdController } from './controllers/common-find-resource-by-id.controller';
export { CommonFindResourceController } from './controllers/common-find-resource.controller';
export { CommonGetResourcesController } from './controllers/common-get-resources.controller';
export { CommonPaginateResourcesController } from './controllers/common-paginate-resources.controller';
export { CommonUpdateResourceByIdController } from './controllers/common-update-resource-by-id.controller';

// export resolvers
export { CommonCreateResourceResolver } from './resolvers/common-create-resource.resolver';
export { CommonDeleteResourceByIdResolver } from './resolvers/common-delete-resource-by-id.resolver';
export { CommonFindResourceByIdResolver } from './resolvers/common-find-resource-by-id.resolver';
export { CommonFindResourceResolver } from './resolvers/common-find-resource.resolver';
export { CommonGetResourcesResolver } from './resolvers/common-get-resources.resolver';
export { CommonPaginateResourcesResolver } from './resolvers/common-paginate-resources.resolver';
export { CommonUpdateResourceByIdResolver } from './resolvers/common-update-resource-by-id.resolver';

// import controllers
import { CommonCreateResourceController } from './controllers/common-create-resource.controller';
import { CommonDeleteResourceByIdController } from './controllers/common-delete-resource-by-id.controller';
import { CommonFindResourceByIdController } from './controllers/common-find-resource-by-id.controller';
import { CommonFindResourceController } from './controllers/common-find-resource.controller';
import { CommonGetResourcesController } from './controllers/common-get-resources.controller';
import { CommonPaginateResourcesController } from './controllers/common-paginate-resources.controller';
import { CommonUpdateResourceByIdController } from './controllers/common-update-resource-by-id.controller';

// import resolvers
import { CommonCreateResourceResolver } from './resolvers/common-create-resource.resolver';
import { CommonDeleteResourceByIdResolver } from './resolvers/common-delete-resource-by-id.resolver';
import { CommonFindResourceByIdResolver } from './resolvers/common-find-resource-by-id.resolver';
import { CommonFindResourceResolver } from './resolvers/common-find-resource.resolver';
import { CommonGetResourcesResolver } from './resolvers/common-get-resources.resolver';
import { CommonPaginateResourcesResolver } from './resolvers/common-paginate-resources.resolver';
import { CommonUpdateResourceByIdResolver } from './resolvers/common-update-resource-by-id.resolver';

// import handlers
import { CommonCreateResourceHandler } from './handlers/common-create-resource.handler';
import { CommonDeleteResourceByIdHandler } from './handlers/common-delete-resource-by-id.handler';
import { CommonFindResourceByIdHandler } from './handlers/common-find-resource-by-id.handler';
import { CommonFindResourceHandler } from './handlers/common-find-resource.handler';
import { CommonGetResourcesHandler } from './handlers/common-get-resources.handler';
import { CommonPaginateResourcesHandler } from './handlers/common-paginate-resources.handler';
import { CommonUpdateResourceByIdHandler } from './handlers/common-update-resource-by-id.handler';

// import seeder
import { CommonResourceSeeder } from './seeder/common-resource.seeder';

export const CommonResourceApiControllers = [
  CommonCreateResourceController,
  CommonPaginateResourcesController,
  CommonGetResourcesController,
  CommonFindResourceByIdController,
  CommonFindResourceController,
  CommonUpdateResourceByIdController,
  CommonDeleteResourceByIdController,
];

export const CommonResourceApiResolvers = [
  CommonCreateResourceResolver,
  CommonPaginateResourcesResolver,
  CommonGetResourcesResolver,
  CommonFindResourceByIdResolver,
  CommonFindResourceResolver,
  CommonUpdateResourceByIdResolver,
  CommonDeleteResourceByIdResolver,
];

export const CommonResourceApiHandlers = [
  CommonCreateResourceHandler,
  CommonPaginateResourcesHandler,
  CommonGetResourcesHandler,
  CommonFindResourceByIdHandler,
  CommonFindResourceHandler,
  CommonUpdateResourceByIdHandler,
  CommonDeleteResourceByIdHandler,
];

export const CommonResourceApiServices = [CommonResourceSeeder];
