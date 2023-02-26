// controllers
import { IamPaginateUsersController } from './controllers/iam-paginate-users.controller';
import { IamGetUsersController } from './controllers/iam-get-users.controller';
import { IamFindUserByIdController } from './controllers/iam-find-user-by-id.controller';
import { IamFindUserController } from './controllers/iam-find-user.controller';
import { IamUpdateUserByIdController } from './controllers/iam-update-user-by-id.controller';
import { IamUpdateUsersController } from './controllers/iam-update-users.controller';
import { IamUpsertUserController } from './controllers/iam-upsert-user.controller';
import { IamDeleteUserByIdController } from './controllers/iam-delete-user-by-id.controller';
import { IamDeleteUsersController } from './controllers/iam-delete-users.controller';

// resolvers
import { IamPaginateUsersResolver } from './resolvers/iam-paginate-users.resolver';
import { IamGetUsersResolver } from './resolvers/iam-get-users.resolver';
import { IamFindUserByIdResolver } from './resolvers/iam-find-user-by-id.resolver';
import { IamFindUserResolver } from './resolvers/iam-find-user.resolver';
import { IamUpdateUserByIdResolver } from './resolvers/iam-update-user-by-id.resolver';
import { IamUpdateUsersResolver } from './resolvers/iam-update-users.resolver';
import { IamUpsertUserResolver } from './resolvers/iam-upsert-user.resolver';
import { IamDeleteUserByIdResolver } from './resolvers/iam-delete-user-by-id.resolver';
import { IamDeleteUsersResolver } from './resolvers/iam-delete-users.resolver';

// handlers
import { IamPaginateUsersHandler } from './handlers/iam-paginate-users.handler';
import { IamGetUsersHandler } from './handlers/iam-get-users.handler';
import { IamFindUserByIdHandler } from './handlers/iam-find-user-by-id.handler';
import { IamFindUserHandler } from './handlers/iam-find-user.handler';
import { IamUpdateUserByIdHandler } from './handlers/iam-update-user-by-id.handler';
import { IamUpdateUsersHandler } from './handlers/iam-update-users.handler';
import { IamUpsertUserHandler } from './handlers/iam-upsert-user.handler';
import { IamDeleteUserByIdHandler } from './handlers/iam-delete-user-by-id.handler';
import { IamDeleteUsersHandler } from './handlers/iam-delete-users.handler';

// seeder
import { IamUserSeeder } from './seeder/iam-user.seeder';

export const IamUserControllers = [
    IamPaginateUsersController,
    IamGetUsersController,
    IamFindUserByIdController,
    IamFindUserController,
    IamUpdateUserByIdController,
    IamUpdateUsersController,
    IamUpsertUserController,
    IamDeleteUserByIdController,
    IamDeleteUsersController,
];

export const IamUserResolvers = [
    IamPaginateUsersResolver,
    IamGetUsersResolver,
    IamFindUserByIdResolver,
    IamFindUserResolver,
    IamUpdateUserByIdResolver,
    IamUpdateUsersResolver,
    IamUpsertUserResolver,
    IamDeleteUserByIdResolver,
    IamDeleteUsersResolver,
];

export const IamUserApiHandlers = [
    IamPaginateUsersHandler,
    IamGetUsersHandler,
    IamFindUserByIdHandler,
    IamFindUserHandler,
    IamUpdateUserByIdHandler,
    IamUpdateUsersHandler,
    IamUpsertUserHandler,
    IamDeleteUserByIdHandler,
    IamDeleteUsersHandler,
];

export const IamUserServices = [
    IamUserSeeder,
];