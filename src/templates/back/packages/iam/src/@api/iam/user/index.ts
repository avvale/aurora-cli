// export DTOs
export { IamCreateUserDto } from './dto/iam-create-user.dto';
export { IamUpdateUserByIdDto } from './dto/iam-update-user-by-id.dto';
export { IamUpdateUsersDto } from './dto/iam-update-users.dto';
export { IamUserDto } from './dto/iam-user.dto';

// export handlers
export { IamDeleteUserByIdHandler } from './handlers/iam-delete-user-by-id.handler';
export { IamDeleteUsersHandler } from './handlers/iam-delete-users.handler';
export { IamFindUserByIdHandler } from './handlers/iam-find-user-by-id.handler';
export { IamFindUserHandler } from './handlers/iam-find-user.handler';
export { IamGetUsersHandler } from './handlers/iam-get-users.handler';
export { IamPaginateUsersHandler } from './handlers/iam-paginate-users.handler';
export { IamUpdateUserByIdHandler } from './handlers/iam-update-user-by-id.handler';
export { IamUpdateUsersHandler } from './handlers/iam-update-users.handler';

// export controllers
export { IamDeleteUserByIdController } from './controllers/iam-delete-user-by-id.controller';
export { IamDeleteUsersController } from './controllers/iam-delete-users.controller';
export { IamFindUserByIdController } from './controllers/iam-find-user-by-id.controller';
export { IamFindUserController } from './controllers/iam-find-user.controller';
export { IamGetUsersController } from './controllers/iam-get-users.controller';
export { IamPaginateUsersController } from './controllers/iam-paginate-users.controller';
export { IamUpdateUserByIdController } from './controllers/iam-update-user-by-id.controller';
export { IamUpdateUsersController } from './controllers/iam-update-users.controller';

// export resolvers
export { IamDeleteUserByIdResolver } from './resolvers/iam-delete-user-by-id.resolver';
export { IamDeleteUsersResolver } from './resolvers/iam-delete-users.resolver';
export { IamFindUserByIdResolver } from './resolvers/iam-find-user-by-id.resolver';
export { IamFindUserResolver } from './resolvers/iam-find-user.resolver';
export { IamGetUsersResolver } from './resolvers/iam-get-users.resolver';
export { IamPaginateUsersResolver } from './resolvers/iam-paginate-users.resolver';
export { IamUpdateUserByIdResolver } from './resolvers/iam-update-user-by-id.resolver';
export { IamUpdateUsersResolver } from './resolvers/iam-update-users.resolver';

// export additionalApis
export { IamForgotPasswordUserController } from './controllers/iam-forgot-password-user.controller';
export { IamResetPasswordUserController } from './controllers/iam-reset-password-user.controller';
export { IamForgotPasswordUserHandler } from './handlers/iam-forgot-password-user.handler';
export { IamResetPasswordUserHandler } from './handlers/iam-reset-password-user.handler';
export { IamForgotPasswordUserResolver } from './resolvers/iam-forgot-password-user.resolver';
export { IamResetPasswordUserResolver } from './resolvers/iam-reset-password-user.resolver';

// import controllers
import { IamDeleteUserByIdController } from './controllers/iam-delete-user-by-id.controller';
import { IamDeleteUsersController } from './controllers/iam-delete-users.controller';
import { IamFindUserByIdController } from './controllers/iam-find-user-by-id.controller';
import { IamFindUserController } from './controllers/iam-find-user.controller';
import { IamGetUsersController } from './controllers/iam-get-users.controller';
import { IamPaginateUsersController } from './controllers/iam-paginate-users.controller';
import { IamUpdateUserByIdController } from './controllers/iam-update-user-by-id.controller';
import { IamUpdateUsersController } from './controllers/iam-update-users.controller';

// import resolvers
import { IamDeleteUserByIdResolver } from './resolvers/iam-delete-user-by-id.resolver';
import { IamDeleteUsersResolver } from './resolvers/iam-delete-users.resolver';
import { IamFindUserByIdResolver } from './resolvers/iam-find-user-by-id.resolver';
import { IamFindUserResolver } from './resolvers/iam-find-user.resolver';
import { IamGetUsersResolver } from './resolvers/iam-get-users.resolver';
import { IamPaginateUsersResolver } from './resolvers/iam-paginate-users.resolver';
import { IamUpdateUserByIdResolver } from './resolvers/iam-update-user-by-id.resolver';
import { IamUpdateUsersResolver } from './resolvers/iam-update-users.resolver';

// import handlers
import { IamDeleteUserByIdHandler } from './handlers/iam-delete-user-by-id.handler';
import { IamDeleteUsersHandler } from './handlers/iam-delete-users.handler';
import { IamFindUserByIdHandler } from './handlers/iam-find-user-by-id.handler';
import { IamFindUserHandler } from './handlers/iam-find-user.handler';
import { IamGetUsersHandler } from './handlers/iam-get-users.handler';
import { IamPaginateUsersHandler } from './handlers/iam-paginate-users.handler';
import { IamUpdateUserByIdHandler } from './handlers/iam-update-user-by-id.handler';
import { IamUpdateUsersHandler } from './handlers/iam-update-users.handler';

// import seeder
import { IamUserSeeder } from './seeder/iam-user.seeder';

// import additionalApis
import { IamForgotPasswordUserController } from './controllers/iam-forgot-password-user.controller';
import { IamResetPasswordUserController } from './controllers/iam-reset-password-user.controller';
import { IamForgotPasswordUserHandler } from './handlers/iam-forgot-password-user.handler';
import { IamResetPasswordUserHandler } from './handlers/iam-reset-password-user.handler';
import { IamForgotPasswordUserResolver } from './resolvers/iam-forgot-password-user.resolver';
import { IamResetPasswordUserResolver } from './resolvers/iam-reset-password-user.resolver';

export const IamUserApiControllers = [
  IamPaginateUsersController,
  IamGetUsersController,
  IamFindUserByIdController,
  IamFindUserController,
  IamUpdateUserByIdController,
  IamUpdateUsersController,
  IamDeleteUserByIdController,
  IamDeleteUsersController,

  // additionalApis
  IamForgotPasswordUserController,
  IamResetPasswordUserController,
];

export const IamUserApiResolvers = [
  IamPaginateUsersResolver,
  IamGetUsersResolver,
  IamFindUserByIdResolver,
  IamFindUserResolver,
  IamUpdateUserByIdResolver,
  IamUpdateUsersResolver,
  IamDeleteUserByIdResolver,
  IamDeleteUsersResolver,

  // additionalApis
  IamForgotPasswordUserResolver,
  IamResetPasswordUserResolver,
];

export const IamUserApiHandlers = [
  IamPaginateUsersHandler,
  IamGetUsersHandler,
  IamFindUserByIdHandler,
  IamFindUserHandler,
  IamUpdateUserByIdHandler,
  IamUpdateUsersHandler,
  IamDeleteUserByIdHandler,
  IamDeleteUsersHandler,

  // additionalApis
  IamForgotPasswordUserHandler,
  IamResetPasswordUserHandler,
];

export const IamUserApiServices = [IamUserSeeder];
