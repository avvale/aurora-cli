// export DTOs
export { IamTagDto } from './dto/iam-tag.dto';
export { IamCreateTagDto } from './dto/iam-create-tag.dto';
export { IamUpdateTagByIdDto } from './dto/iam-update-tag-by-id.dto';
export { IamUpdateTagsDto } from './dto/iam-update-tags.dto';

// export handlers
export { IamCreateTagHandler } from './handlers/iam-create-tag.handler';
export { IamCreateTagsHandler } from './handlers/iam-create-tags.handler';
export { IamPaginateTagsHandler } from './handlers/iam-paginate-tags.handler';
export { IamGetTagsHandler } from './handlers/iam-get-tags.handler';
export { IamFindTagByIdHandler } from './handlers/iam-find-tag-by-id.handler';
export { IamFindTagHandler } from './handlers/iam-find-tag.handler';
export { IamUpdateTagByIdHandler } from './handlers/iam-update-tag-by-id.handler';
export { IamUpdateTagsHandler } from './handlers/iam-update-tags.handler';
export { IamUpsertTagHandler } from './handlers/iam-upsert-tag.handler';
export { IamDeleteTagByIdHandler } from './handlers/iam-delete-tag-by-id.handler';
export { IamDeleteTagsHandler } from './handlers/iam-delete-tags.handler';

// export controllers
export { IamCreateTagController } from './controllers/iam-create-tag.controller';
export { IamCreateTagsController } from './controllers/iam-create-tags.controller';
export { IamPaginateTagsController } from './controllers/iam-paginate-tags.controller';
export { IamGetTagsController } from './controllers/iam-get-tags.controller';
export { IamFindTagByIdController } from './controllers/iam-find-tag-by-id.controller';
export { IamFindTagController } from './controllers/iam-find-tag.controller';
export { IamUpdateTagByIdController } from './controllers/iam-update-tag-by-id.controller';
export { IamUpdateTagsController } from './controllers/iam-update-tags.controller';
export { IamUpsertTagController } from './controllers/iam-upsert-tag.controller';
export { IamDeleteTagByIdController } from './controllers/iam-delete-tag-by-id.controller';
export { IamDeleteTagsController } from './controllers/iam-delete-tags.controller';

// export resolvers
export { IamCreateTagResolver } from './resolvers/iam-create-tag.resolver';
export { IamCreateTagsResolver } from './resolvers/iam-create-tags.resolver';
export { IamPaginateTagsResolver } from './resolvers/iam-paginate-tags.resolver';
export { IamGetTagsResolver } from './resolvers/iam-get-tags.resolver';
export { IamFindTagByIdResolver } from './resolvers/iam-find-tag-by-id.resolver';
export { IamFindTagResolver } from './resolvers/iam-find-tag.resolver';
export { IamUpdateTagByIdResolver } from './resolvers/iam-update-tag-by-id.resolver';
export { IamUpdateTagsResolver } from './resolvers/iam-update-tags.resolver';
export { IamUpsertTagResolver } from './resolvers/iam-upsert-tag.resolver';
export { IamDeleteTagByIdResolver } from './resolvers/iam-delete-tag-by-id.resolver';
export { IamDeleteTagsResolver } from './resolvers/iam-delete-tags.resolver';

// import controllers
import { IamCreateTagController } from './controllers/iam-create-tag.controller';
import { IamCreateTagsController } from './controllers/iam-create-tags.controller';
import { IamPaginateTagsController } from './controllers/iam-paginate-tags.controller';
import { IamGetTagsController } from './controllers/iam-get-tags.controller';
import { IamFindTagByIdController } from './controllers/iam-find-tag-by-id.controller';
import { IamFindTagController } from './controllers/iam-find-tag.controller';
import { IamUpdateTagByIdController } from './controllers/iam-update-tag-by-id.controller';
import { IamUpdateTagsController } from './controllers/iam-update-tags.controller';
import { IamUpsertTagController } from './controllers/iam-upsert-tag.controller';
import { IamDeleteTagByIdController } from './controllers/iam-delete-tag-by-id.controller';
import { IamDeleteTagsController } from './controllers/iam-delete-tags.controller';

// import resolvers
import { IamCreateTagResolver } from './resolvers/iam-create-tag.resolver';
import { IamCreateTagsResolver } from './resolvers/iam-create-tags.resolver';
import { IamPaginateTagsResolver } from './resolvers/iam-paginate-tags.resolver';
import { IamGetTagsResolver } from './resolvers/iam-get-tags.resolver';
import { IamFindTagByIdResolver } from './resolvers/iam-find-tag-by-id.resolver';
import { IamFindTagResolver } from './resolvers/iam-find-tag.resolver';
import { IamUpdateTagByIdResolver } from './resolvers/iam-update-tag-by-id.resolver';
import { IamUpdateTagsResolver } from './resolvers/iam-update-tags.resolver';
import { IamUpsertTagResolver } from './resolvers/iam-upsert-tag.resolver';
import { IamDeleteTagByIdResolver } from './resolvers/iam-delete-tag-by-id.resolver';
import { IamDeleteTagsResolver } from './resolvers/iam-delete-tags.resolver';

// import handlers
import { IamCreateTagHandler } from './handlers/iam-create-tag.handler';
import { IamCreateTagsHandler } from './handlers/iam-create-tags.handler';
import { IamPaginateTagsHandler } from './handlers/iam-paginate-tags.handler';
import { IamGetTagsHandler } from './handlers/iam-get-tags.handler';
import { IamFindTagByIdHandler } from './handlers/iam-find-tag-by-id.handler';
import { IamFindTagHandler } from './handlers/iam-find-tag.handler';
import { IamUpdateTagByIdHandler } from './handlers/iam-update-tag-by-id.handler';
import { IamUpdateTagsHandler } from './handlers/iam-update-tags.handler';
import { IamUpsertTagHandler } from './handlers/iam-upsert-tag.handler';
import { IamDeleteTagByIdHandler } from './handlers/iam-delete-tag-by-id.handler';
import { IamDeleteTagsHandler } from './handlers/iam-delete-tags.handler';

// import seeder
import { IamTagSeeder } from './seeder/iam-tag.seeder';

export const IamTagApiControllers = [
    IamCreateTagController,
    IamCreateTagsController,
    IamPaginateTagsController,
    IamGetTagsController,
    IamFindTagByIdController,
    IamFindTagController,
    IamUpdateTagByIdController,
    IamUpdateTagsController,
    IamUpsertTagController,
    IamDeleteTagByIdController,
    IamDeleteTagsController,
];

export const IamTagApiResolvers = [
    IamCreateTagResolver,
    IamCreateTagsResolver,
    IamPaginateTagsResolver,
    IamGetTagsResolver,
    IamFindTagByIdResolver,
    IamFindTagResolver,
    IamUpdateTagByIdResolver,
    IamUpdateTagsResolver,
    IamUpsertTagResolver,
    IamDeleteTagByIdResolver,
    IamDeleteTagsResolver,
];

export const IamTagApiHandlers = [
    IamCreateTagHandler,
    IamCreateTagsHandler,
    IamPaginateTagsHandler,
    IamGetTagsHandler,
    IamFindTagByIdHandler,
    IamFindTagHandler,
    IamUpdateTagByIdHandler,
    IamUpdateTagsHandler,
    IamUpsertTagHandler,
    IamDeleteTagByIdHandler,
    IamDeleteTagsHandler,
];

export const IamTagApiServices = [
    IamTagSeeder,
];
