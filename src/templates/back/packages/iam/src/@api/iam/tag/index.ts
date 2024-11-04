// export DTOs
export { IamTagDto } from './dto/iam-tag.dto';
export { IamCreateTagDto } from './dto/iam-create-tag.dto';
export { IamUpdateTagByIdDto } from './dto/iam-update-tag-by-id.dto';
export { IamUpdateTagsDto } from './dto/iam-update-tags.dto';

// export handlers
export { IamCreateTagHandler } from './handlers/iam-create-tag.handler';
export { IamPaginateTagsHandler } from './handlers/iam-paginate-tags.handler';
export { IamGetTagsHandler } from './handlers/iam-get-tags.handler';
export { IamFindTagByIdHandler } from './handlers/iam-find-tag-by-id.handler';
export { IamFindTagHandler } from './handlers/iam-find-tag.handler';
export { IamUpdateTagByIdHandler } from './handlers/iam-update-tag-by-id.handler';
export { IamDeleteTagByIdHandler } from './handlers/iam-delete-tag-by-id.handler';

// export controllers
export { IamCreateTagController } from './controllers/iam-create-tag.controller';
export { IamPaginateTagsController } from './controllers/iam-paginate-tags.controller';
export { IamGetTagsController } from './controllers/iam-get-tags.controller';
export { IamFindTagByIdController } from './controllers/iam-find-tag-by-id.controller';
export { IamFindTagController } from './controllers/iam-find-tag.controller';
export { IamUpdateTagByIdController } from './controllers/iam-update-tag-by-id.controller';
export { IamDeleteTagByIdController } from './controllers/iam-delete-tag-by-id.controller';

// export resolvers
export { IamCreateTagResolver } from './resolvers/iam-create-tag.resolver';
export { IamPaginateTagsResolver } from './resolvers/iam-paginate-tags.resolver';
export { IamGetTagsResolver } from './resolvers/iam-get-tags.resolver';
export { IamFindTagByIdResolver } from './resolvers/iam-find-tag-by-id.resolver';
export { IamFindTagResolver } from './resolvers/iam-find-tag.resolver';
export { IamUpdateTagByIdResolver } from './resolvers/iam-update-tag-by-id.resolver';
export { IamDeleteTagByIdResolver } from './resolvers/iam-delete-tag-by-id.resolver';

// import controllers
import { IamCreateTagController } from './controllers/iam-create-tag.controller';
import { IamPaginateTagsController } from './controllers/iam-paginate-tags.controller';
import { IamGetTagsController } from './controllers/iam-get-tags.controller';
import { IamFindTagByIdController } from './controllers/iam-find-tag-by-id.controller';
import { IamFindTagController } from './controllers/iam-find-tag.controller';
import { IamUpdateTagByIdController } from './controllers/iam-update-tag-by-id.controller';
import { IamDeleteTagByIdController } from './controllers/iam-delete-tag-by-id.controller';

// import resolvers
import { IamCreateTagResolver } from './resolvers/iam-create-tag.resolver';
import { IamPaginateTagsResolver } from './resolvers/iam-paginate-tags.resolver';
import { IamGetTagsResolver } from './resolvers/iam-get-tags.resolver';
import { IamFindTagByIdResolver } from './resolvers/iam-find-tag-by-id.resolver';
import { IamFindTagResolver } from './resolvers/iam-find-tag.resolver';
import { IamUpdateTagByIdResolver } from './resolvers/iam-update-tag-by-id.resolver';
import { IamDeleteTagByIdResolver } from './resolvers/iam-delete-tag-by-id.resolver';

// import handlers
import { IamCreateTagHandler } from './handlers/iam-create-tag.handler';
import { IamPaginateTagsHandler } from './handlers/iam-paginate-tags.handler';
import { IamGetTagsHandler } from './handlers/iam-get-tags.handler';
import { IamFindTagByIdHandler } from './handlers/iam-find-tag-by-id.handler';
import { IamFindTagHandler } from './handlers/iam-find-tag.handler';
import { IamUpdateTagByIdHandler } from './handlers/iam-update-tag-by-id.handler';
import { IamDeleteTagByIdHandler } from './handlers/iam-delete-tag-by-id.handler';

// import seeder
import { IamTagSeeder } from './seeder/iam-tag.seeder';

export const IamTagApiControllers = [
    IamCreateTagController,
    IamPaginateTagsController,
    IamGetTagsController,
    IamFindTagByIdController,
    IamFindTagController,
    IamUpdateTagByIdController,
    IamDeleteTagByIdController,
];

export const IamTagApiResolvers = [
    IamCreateTagResolver,
    IamPaginateTagsResolver,
    IamGetTagsResolver,
    IamFindTagByIdResolver,
    IamFindTagResolver,
    IamUpdateTagByIdResolver,
    IamDeleteTagByIdResolver,
];

export const IamTagApiHandlers = [
    IamCreateTagHandler,
    IamPaginateTagsHandler,
    IamGetTagsHandler,
    IamFindTagByIdHandler,
    IamFindTagHandler,
    IamUpdateTagByIdHandler,
    IamDeleteTagByIdHandler,
];

export const IamTagApiServices = [
    IamTagSeeder,
];
