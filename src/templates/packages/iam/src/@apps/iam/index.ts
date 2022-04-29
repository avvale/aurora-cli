import { IamBoundedContextHandlers, IamBoundedContextServices, IamBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';
import { IamPermissionHandlers, IamPermissionServices, IamPermissionModel, IPermissionRepository, SequelizePermissionRepository, PermissionSagas, IamPermissionsRolesModel, IPermissionRoleRepository, SequelizePermissionRoleRepository } from './permission';
import { IamTenantHandlers, IamTenantServices, IamTenantModel, ITenantRepository, SequelizeTenantRepository, TenantSagas, IamTenantsAccountsModel } from './tenant';
import { IamRoleHandlers, IamRoleServices, IamRoleModel, IRoleRepository, SequelizeRoleRepository, RoleSagas, IamRolesAccountsModel, SequelizeRoleAccountRepository, IRoleAccountRepository } from './role';
import { IamAccountHandlers, IamAccountServices, IamAccountModel, IAccountRepository, SequelizeAccountRepository, AccountSagas } from './account';
import { IamUserHandlers, IamUserServices, IamUserModel, IUserRepository, SequelizeUserRepository, UserSagas } from './user';

export const IamHandlers = [
    ...IamBoundedContextHandlers,
    ...IamPermissionHandlers,
    ...IamTenantHandlers,
    ...IamRoleHandlers,
    ...IamAccountHandlers,
    ...IamUserHandlers
];
export const IamServices = [
    ...IamBoundedContextServices,
    ...IamPermissionServices,
    ...IamTenantServices,
    ...IamRoleServices,
    ...IamAccountServices,
    ...IamUserServices
];
export const IamModels = [
    IamBoundedContextModel,
    IamPermissionModel,
    IamPermissionsRolesModel,
    IamTenantModel,
    IamTenantsAccountsModel,
    IamRoleModel,
    IamRolesAccountsModel,
    IamAccountModel,
    IamUserModel
];
export const IamRepositories = [
    {
        provide : IBoundedContextRepository,
        useClass: SequelizeBoundedContextRepository
    },
    {
        provide : IPermissionRepository,
        useClass: SequelizePermissionRepository
    },
    {
        provide : ITenantRepository,
        useClass: SequelizeTenantRepository
    },
    {
        provide : IRoleRepository,
        useClass: SequelizeRoleRepository
    },
    {
        provide : IAccountRepository,
        useClass: SequelizeAccountRepository
    },
    {
        provide : IUserRepository,
        useClass: SequelizeUserRepository
    },

    // custom
    {
        provide : IPermissionRoleRepository,
        useClass: SequelizePermissionRoleRepository
    },
    {
        provide : IRoleAccountRepository,
        useClass: SequelizeRoleAccountRepository
    }
];
export const IamSagas = [
    BoundedContextSagas,
    PermissionSagas,
    TenantSagas,
    RoleSagas,
    AccountSagas,
    UserSagas
];
