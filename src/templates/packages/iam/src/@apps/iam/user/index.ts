// commands
import { CreateUserCommandHandler } from './application/create/create-user.command-handler';
import { CreateUsersCommandHandler } from './application/create/create-users.command-handler';
import { UpdateUserCommandHandler } from './application/update/update-user.command-handler';
import { DeleteUserByIdCommandHandler } from './application/delete/delete-user-by-id.command-handler';
import { DeleteUsersCommandHandler } from './application/delete/delete-users.command-handler';

// queries
import { PaginateUsersQueryHandler } from './application/paginate/paginate-users.query-handler';
import { GetUsersQueryHandler } from './application/get/get-users.query-handler';
import { FindUserQueryHandler } from './application/find/find-user.query-handler';
import { FindUserByIdQueryHandler } from './application/find/find-user-by-id.query-handler';

// events
import { CreatedUserEventHandler } from './application/events/created-user.event-handler';
import { CreatedUsersEventHandler } from './application/events/created-users.event-handler';
import { UpdatedUserEventHandler } from './application/events/updated-user.event-handler';
import { DeletedUserEventHandler } from './application/events/deleted-user.event-handler';
import { DeletedUsersEventHandler } from './application/events/deleted-users.event-handler';

// services
import { CreateUserService } from './application/create/create-user.service';
import { CreateUsersService } from './application/create/create-users.service';
import { PaginateUsersService } from './application/paginate/paginate-users.service';
import { GetUsersService } from './application/get/get-users.service';
import { FindUserService } from './application/find/find-user.service';
import { FindUserByIdService } from './application/find/find-user-by-id.service';
import { UpdateUserService } from './application/update/update-user.service';
import { DeleteUserByIdService } from './application/delete/delete-user-by-id.service';
import { DeleteUsersService } from './application/delete/delete-users.service';

// models
export { IamUserModel } from './infrastructure/sequelize/sequelize-user.model';

// repository
export { IUserRepository } from './domain/user.repository';
export { SequelizeUserRepository } from './infrastructure/sequelize/sequelize-user.repository';

// sagas
export { UserSagas } from './application/sagas/user.sagas';

export const IamUserHandlers = [
    // commands
    CreateUserCommandHandler,
    CreateUsersCommandHandler,
    UpdateUserCommandHandler,
    DeleteUserByIdCommandHandler,
    DeleteUsersCommandHandler,

    // queries
    PaginateUsersQueryHandler,
    GetUsersQueryHandler,
    FindUserQueryHandler,
    FindUserByIdQueryHandler,

    // events
    CreatedUserEventHandler,
    CreatedUsersEventHandler,
    UpdatedUserEventHandler,
    DeletedUserEventHandler,
    DeletedUsersEventHandler,
];

export const IamUserServices = [
    CreateUserService,
    CreateUsersService,
    PaginateUsersService,
    GetUsersService,
    FindUserService,
    FindUserByIdService,
    UpdateUserService,
    DeleteUserByIdService,
    DeleteUsersService,
];