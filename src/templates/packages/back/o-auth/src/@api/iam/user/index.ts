// controllers
import { IamCreateUserController } from './controllers/iam-create-user.controller';
import { IamCreateUsersController } from './controllers/iam-create-users.controller';
import { IamPaginateUsersController } from './controllers/iam-paginate-users.controller';
import { IamGetUsersController } from './controllers/iam-get-users.controller';
import { IamFindUserByIdController } from './controllers/iam-find-user-by-id.controller';
import { IamFindUserController } from './controllers/iam-find-user.controller';
import { IamUpdateUserByIdController } from './controllers/iam-update-user-by-id.controller';
import { IamUpdateUsersController } from './controllers/iam-update-users.controller';
import { IamDeleteUserByIdController } from './controllers/iam-delete-user-by-id.controller';
import { IamDeleteUsersController } from './controllers/iam-delete-users.controller';

// resolvers
import { IamCreateUserResolver } from './resolvers/iam-create-user.resolver';
import { IamCreateUsersResolver } from './resolvers/iam-create-users.resolver';
import { IamPaginateUsersResolver } from './resolvers/iam-paginate-users.resolver';
import { IamGetUsersResolver } from './resolvers/iam-get-users.resolver';
import { IamFindUserByIdResolver } from './resolvers/iam-find-user-by-id.resolver';
import { IamFindUserResolver } from './resolvers/iam-find-user.resolver';
import { IamUpdateUserByIdResolver } from './resolvers/iam-update-user-by-id.resolver';
import { IamUpdateUsersResolver } from './resolvers/iam-update-users.resolver';
import { IamDeleteUserByIdResolver } from './resolvers/iam-delete-user-by-id.resolver';
import { IamDeleteUsersResolver } from './resolvers/iam-delete-users.resolver';

// handlers
import { IamCreateUserHandler } from './handlers/iam-create-user.handler';
import { IamCreateUsersHandler } from './handlers/iam-create-users.handler';
import { IamPaginateUsersHandler } from './handlers/iam-paginate-users.handler';
import { IamGetUsersHandler } from './handlers/iam-get-users.handler';
import { IamFindUserByIdHandler } from './handlers/iam-find-user-by-id.handler';
import { IamFindUserHandler } from './handlers/iam-find-user.handler';
import { IamUpdateUserByIdHandler } from './handlers/iam-update-user-by-id.handler';
import { IamUpdateUsersHandler } from './handlers/iam-update-users.handler';
import { IamDeleteUserByIdHandler } from './handlers/iam-delete-user-by-id.handler';
import { IamDeleteUsersHandler } from './handlers/iam-delete-users.handler';

export const IamUserControllers = [
    IamCreateUserController,
    IamCreateUsersController,
    IamPaginateUsersController,
    IamGetUsersController,
    IamFindUserByIdController,
    IamFindUserController,
    IamUpdateUserByIdController,
    IamUpdateUsersController,
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
    IamUpdateUserByIdResolver,
    IamUpdateUsersResolver,
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
    IamUpdateUserByIdHandler,
    IamUpdateUsersHandler,
    IamDeleteUserByIdHandler,
    IamDeleteUsersHandler,
];