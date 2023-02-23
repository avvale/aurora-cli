// controllers
import { IamFindUserMetaByIdController } from './controllers/iam-find-user-meta-by-id.controller';
import { IamUpdateUserMetaByIdController } from './controllers/iam-update-user-meta-by-id.controller';

// resolvers
import { IamFindUserMetaByIdResolver } from './resolvers/iam-find-user-meta-by-id.resolver';
import { IamUpdateUserMetaByIdResolver } from './resolvers/iam-update-user-meta-by-id.resolver';

// handlers
import { IamFindUserMetaByIdHandler } from './handlers/iam-find-user-meta-by-id.handler';
import { IamUpdateUserMetaByIdHandler } from './handlers/iam-update-user-meta-by-id.handler';

export const IamUserMetaControllers = [
    IamFindUserMetaByIdController,
    IamUpdateUserMetaByIdController,
];

export const IamUserMetaResolvers = [
    IamFindUserMetaByIdResolver,
    IamUpdateUserMetaByIdResolver,
];

export const IamUserMetaApiHandlers = [
    IamFindUserMetaByIdHandler,
    IamUpdateUserMetaByIdHandler,
];