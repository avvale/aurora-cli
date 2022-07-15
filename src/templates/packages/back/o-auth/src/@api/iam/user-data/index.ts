// controllers
import { IamFindUserDataByIdController } from './controllers/iam-find-user-data-by-id.controller';
import { IamUpdateUserDataByIdController } from './controllers/iam-update-user-data-by-id.controller';

// resolvers
import { IamFindUserDataByIdResolver } from './resolvers/iam-find-user-data-by-id.resolver';
import { IamUpdateUserDataByIdResolver } from './resolvers/iam-update-user-data-by-id.resolver';

// handlers
import { IamFindUserDataByIdHandler } from './handlers/iam-find-user-data-by-id.handler';
import { IamUpdateUserDataByIdHandler } from './handlers/iam-update-user-data-by-id.handler';

export const IamUserDataControllers = [
    IamFindUserDataByIdController,
    IamUpdateUserDataByIdController,
];

export const IamUserDataResolvers = [
    IamFindUserDataByIdResolver,
    IamUpdateUserDataByIdResolver,
];

export const IamUserDataApiHandlers = [
    IamFindUserDataByIdHandler,
    IamUpdateUserDataByIdHandler,
];