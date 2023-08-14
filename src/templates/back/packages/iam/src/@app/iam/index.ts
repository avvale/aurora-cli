import { IamBoundedContextHandlers, IamBoundedContextServices, IamBoundedContextModel, IamIBoundedContextRepository, IamSequelizeBoundedContextRepository, IamBoundedContextSagas } from './bounded-context';
import { IamPermissionHandlers, IamPermissionServices, IamPermissionModel, IamIPermissionRepository, IamSequelizePermissionRepository, IamPermissionSagas } from './permission';
import { IamPermissionRoleHandlers, IamPermissionRoleServices, IamPermissionsRolesModel, IamIPermissionRoleRepository, IamSequelizePermissionRoleRepository } from './permission-role';
import { IamTenantHandlers, IamTenantServices, IamTenantModel, IamTenantsAccountsModel, IamITenantRepository, IamSequelizeTenantRepository, IamTenantSagas } from './tenant';
import { IamRoleHandlers, IamRoleServices, IamRoleModel, IamRolesAccountsModel, IamSequelizeRoleAccountRepository, IamIRoleAccountRepository, IamIRoleRepository, IamSequelizeRoleRepository, IamRoleSagas } from './role';
import { IamAccountHandlers, IamAccountServices, IamAccountModel, IamIAccountRepository, IamSequelizeAccountRepository, IamAccountSagas } from './account';
import { IamUserHandlers, IamUserServices, IamUserModel, IamIUserRepository, IamSequelizeUserRepository, IamUserSagas } from './user';

export const IamHandlers = [
    ...IamBoundedContextHandlers,
    ...IamPermissionHandlers,
    ...IamPermissionRoleHandlers,
    ...IamTenantHandlers,
    ...IamRoleHandlers,
    ...IamAccountHandlers,
    ...IamUserHandlers
];
export const IamServices = [
    ...IamBoundedContextServices,
    ...IamPermissionServices,
    ...IamPermissionRoleServices,
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
        provide : IamIRoleRepository,
        useClass: IamSequelizeRoleRepository
    },
    {
        provide : IamIAccountRepository,
        useClass: IamSequelizeAccountRepository
    },
    {
        provide : IamIUserRepository,
        useClass: IamSequelizeUserRepository
    },
    {
        provide : IamITenantRepository,
        useClass: IamSequelizeTenantRepository
    },

    // ---- customizations ----
    {
        provide : IamIPermissionRoleRepository,
        useClass: IamSequelizePermissionRoleRepository
    },
    {
        provide : IamIRoleAccountRepository,
        useClass: IamSequelizeRoleAccountRepository
    },
    {
        provide : IamIPermissionRepository,
        useClass: IamSequelizePermissionRepository
    },
    {
        provide : IamIRoleRepository,
        useClass: IamSequelizeRoleRepository
    },
    {
        provide : IamIBoundedContextRepository,
        useClass: IamSequelizeBoundedContextRepository
    }
];
export const IamSagas = [
    IamRoleSagas,
    IamPermissionSagas,
    IamRoleSagas,
    IamBoundedContextSagas,
    IamAccountSagas,
    IamUserSagas,
    IamTenantSagas
];
