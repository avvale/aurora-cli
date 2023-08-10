// export commands
export { IamCreateUserCommand } from './application/create/iam-create-user.command';
export { IamCreateUsersCommand } from './application/create/iam-create-users.command';
export { IamUpdateUserByIdCommand } from './application/update/iam-update-user-by-id.command';
export { IamUpdateUsersCommand } from './application/update/iam-update-users.command';
export { IamUpsertUserCommand } from './application/upsert/iam-upsert-user.command';
export { IamDeleteUserByIdCommand } from './application/delete/iam-delete-user-by-id.command';
export { IamDeleteUsersCommand } from './application/delete/iam-delete-users.command';

// export queries
export { IamPaginateUsersQuery } from './application/paginate/iam-paginate-users.query';
export { IamGetUsersQuery } from './application/get/iam-get-users.query';
export { IamFindUserQuery } from './application/find/iam-find-user.query';
export { IamFindUserByIdQuery } from './application/find/iam-find-user-by-id.query';
export { IamRawSQLUsersQuery } from './application/raw-sql/iam-raw-sql-users.query';

// export mocks
export { iamMockUserData } from './infrastructure/mock/iam-mock-user.data';
export { IamMockUserSeeder } from './infrastructure/mock/iam-mock-user.seeder';
export { IamMockUserRepository } from './infrastructure/mock/iam-mock-user.repository';

// export events
export { IamAddUsersContextEvent } from './application/events/iam-add-users-context.event';
export { IamCreatedUsersEvent } from './application/events/iam-created-users.event';
export { IamCreatedUserEvent } from './application/events/iam-created-user.event';
export { IamDeletedUsersEvent } from './application/events/iam-deleted-users.event';
export { IamDeletedUserEvent } from './application/events/iam-deleted-user.event';
export { IamUpdatedUsersEvent } from './application/events/iam-updated-users.event';
export { IamUpdatedUserEvent } from './application/events/iam-updated-user.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamUser } from './domain/iam-user.aggregate';
export { IamUserMapper } from './domain/iam-user.mapper';
export { IamIUserRepository } from './domain/iam-user.repository';
export { IamUserResponse } from './domain/iam-user.response';

// infrastructure
export { IamUserModel } from './infrastructure/sequelize/iam-sequelize-user.model';
export { IamSequelizeUserRepository } from './infrastructure/sequelize/iam-sequelize-user.repository';

// sagas
export { IamUserSagas } from './application/sagas/iam-user.sagas';

// ---- customizations ----
export { IamFindUserByUsernamePasswordQuery } from './application/find/iam-find-user-by-username-password.query';

// command handlers
import { IamCreateUserCommandHandler } from './application/create/iam-create-user.command-handler';
import { IamCreateUsersCommandHandler } from './application/create/iam-create-users.command-handler';
import { IamUpdateUserByIdCommandHandler } from './application/update/iam-update-user-by-id.command-handler';
import { IamUpdateUsersCommandHandler } from './application/update/iam-update-users.command-handler';
import { IamUpsertUserCommandHandler } from './application/upsert/iam-upsert-user.command-handler';
import { IamDeleteUserByIdCommandHandler } from './application/delete/iam-delete-user-by-id.command-handler';
import { IamDeleteUsersCommandHandler } from './application/delete/iam-delete-users.command-handler';

// query handlers
import { IamPaginateUsersQueryHandler } from './application/paginate/iam-paginate-users.query-handler';
import { IamGetUsersQueryHandler } from './application/get/iam-get-users.query-handler';
import { IamFindUserQueryHandler } from './application/find/iam-find-user.query-handler';
import { IamFindUserByIdQueryHandler } from './application/find/iam-find-user-by-id.query-handler';
import { IamRawSQLUsersQueryHandler } from './application/raw-sql/iam-raw-sql-users.query-handler';

// event handlers
import { IamCreatedUserEventHandler } from './application/events/iam-created-user.event-handler';
import { IamCreatedUsersEventHandler } from './application/events/iam-created-users.event-handler';
import { IamUpdatedUserEventHandler } from './application/events/iam-updated-user.event-handler';
import { IamUpdatedUsersEventHandler } from './application/events/iam-updated-users.event-handler';
import { IamDeletedUserEventHandler } from './application/events/iam-deleted-user.event-handler';
import { IamDeletedUsersEventHandler } from './application/events/iam-deleted-users.event-handler';

// services
import { IamCreateUserService } from './application/create/iam-create-user.service';
import { IamCreateUsersService } from './application/create/iam-create-users.service';
import { IamPaginateUsersService } from './application/paginate/iam-paginate-users.service';
import { IamGetUsersService } from './application/get/iam-get-users.service';
import { IamFindUserService } from './application/find/iam-find-user.service';
import { IamFindUserByIdService } from './application/find/iam-find-user-by-id.service';
import { IamRawSQLUsersService } from './application/raw-sql/iam-raw-sql-users.service';
import { IamUpdateUserByIdService } from './application/update/iam-update-user-by-id.service';
import { IamUpdateUsersService } from './application/update/iam-update-users.service';
import { IamUpsertUserService } from './application/upsert/iam-upsert-user.service';
import { IamDeleteUserByIdService } from './application/delete/iam-delete-user-by-id.service';
import { IamDeleteUsersService } from './application/delete/iam-delete-users.service';

// ---- customizations ----
import { IamFindUserByUsernamePasswordService } from './application/find/iam-find-user-by-username-password.service';
import { IamFindUserByUsernamePasswordQueryHandler } from './application/find/iam-find-user-by-username-password.query-handler';

export const IamUserHandlers = [
    // commands
    IamCreateUserCommandHandler,
    IamCreateUsersCommandHandler,
    IamUpdateUserByIdCommandHandler,
    IamUpdateUsersCommandHandler,
    IamUpsertUserCommandHandler,
    IamDeleteUserByIdCommandHandler,
    IamDeleteUsersCommandHandler,

    // queries
    IamPaginateUsersQueryHandler,
    IamGetUsersQueryHandler,
    IamFindUserQueryHandler,
    IamFindUserByIdQueryHandler,
    IamRawSQLUsersQueryHandler,

    // ---- customizations ----
    IamFindUserByUsernamePasswordQueryHandler,

    // events
    IamCreatedUserEventHandler,
    IamCreatedUsersEventHandler,
    IamUpdatedUserEventHandler,
    IamUpdatedUsersEventHandler,
    IamDeletedUserEventHandler,
    IamDeletedUsersEventHandler,
];

export const IamUserServices = [
    IamCreateUserService,
    IamCreateUsersService,
    IamPaginateUsersService,
    IamGetUsersService,
    IamFindUserService,
    IamFindUserByIdService,
    IamRawSQLUsersService,
    IamUpdateUserByIdService,
    IamUpdateUsersService,
    IamUpsertUserService,
    IamDeleteUserByIdService,
    IamDeleteUsersService,

    // ---- customizations ----
    IamFindUserByUsernamePasswordService,
];