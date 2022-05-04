// controllers
import { IamCreateUserController } from './controllers/iam-create-user.controller';
import { IamCreateUsersController } from './controllers/iam-create-users.controller';
import { IamPaginateUsersController } from './controllers/iam-paginate-users.controller';
import { IamGetUsersController } from './controllers/iam-get-users.controller';
import { IamFindUserByIdController } from './controllers/iam-find-user-by-id.controller';
import { IamFindUserController } from './controllers/iam-find-user.controller';
import { IamUpdateUserController } from './controllers/iam-update-user.controller';
import { IamDeleteUserByIdController } from './controllers/iam-delete-user-by-id.controller';
import { IamDeleteUsersController } from './controllers/iam-delete-users.controller';

// resolvers
import { IamCreateUserResolver } from './resolvers/iam-create-user.resolver';
import { IamCreateUsersResolver } from './resolvers/iam-create-users.resolver';
import { IamPaginateUsersResolver } from './resolvers/iam-paginate-users.resolver';
import { IamGetUsersResolver } from './resolvers/iam-get-users.resolver';
import { IamFindUserByIdResolver } from './resolvers/iam-find-user-by-id.resolver';
import { IamFindUserResolver } from './resolvers/iam-find-user.resolver';
import { IamUpdateUserResolver } from './resolvers/iam-update-user.resolver';
import { IamDeleteUserByIdResolver } from './resolvers/iam-delete-user-by-id.resolver';
import { IamDeleteUsersResolver } from './resolvers/iam-delete-users.resolver';

// handlers
import { IamCreateUserHandler } from './handlers/iam-create-user.handler';
import { IamCreateUsersHandler } from './handlers/iam-create-users.handler';
import { IamPaginateUsersHandler } from './handlers/iam-paginate-users.handler';
import { IamGetUsersHandler } from './handlers/iam-get-users.handler';
import { IamFindUserByIdHandler } from './handlers/iam-find-user-by-id.handler';
import { IamFindUserHandler } from './handlers/iam-find-user.handler';
import { IamUpdateUserHandler } from './handlers/iam-update-user.handler';
import { IamDeleteUserByIdHandler } from './handlers/iam-delete-user-by-id.handler';
import { IamDeleteUsersHandler } from './handlers/iam-delete-users.handler';

export const IamUserControllers = [
    IamCreateUserController,
    IamCreateUsersController,
    IamPaginateUsersController,
    IamGetUsersController,
    IamFindUserByIdController,
    IamFindUserController,
    IamUpdateUserController,
    IamDeleteUserByIdController,
    IamDeleteUsersController,
];

export const IamUserResolvers = [
    IamCreateUserResolver,
    IamCreateUsersResolver,
    IamPaginateUsersResolver,
    IamGetUsersResolver,
    IamFindUserByIdResolver,
    IamFindUserResolver,
    IamUpdateUserResolver,
    IamDeleteUserByIdResolver,
    IamDeleteUsersResolver,
];

export const IamUserApiHandlers = [
    IamCreateUserHandler,
    IamCreateUsersHandler,
    IamPaginateUsersHandler,
    IamGetUsersHandler,
    IamFindUserByIdHandler,
    IamFindUserHandler,
    IamUpdateUserHandler,
    IamDeleteUserByIdHandler,
    IamDeleteUsersHandler,
];