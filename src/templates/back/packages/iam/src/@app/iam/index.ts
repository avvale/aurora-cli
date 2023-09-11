import { IamBoundedContextHandlers, IamBoundedContextServices, IamBoundedContextModel, IamIBoundedContextRepository, IamSequelizeBoundedContextRepository, IamBoundedContextSagas } from './bounded-context';
import { IamPermissionHandlers, IamPermissionServices, IamPermissionModel, IamIPermissionRepository, IamSequelizePermissionRepository, IamPermissionSagas } from './permission';
import { IamPermissionRoleHandlers, IamPermissionRoleServices, IamIPermissionRoleRepository, IamSequelizePermissionRoleRepository, IamPermissionRoleModel, IamPermissionRoleSagas } from './permission-role';
import { IamTenantHandlers, IamTenantServices, IamTenantModel, IamITenantRepository, IamSequelizeTenantRepository, IamTenantSagas } from './tenant';
import { IamRoleHandlers, IamRoleServices, IamRoleModel, IamIRoleRepository, IamSequelizeRoleRepository, IamRoleSagas } from './role';
import { IamAccountHandlers, IamAccountServices, IamAccountModel, IamIAccountRepository, IamSequelizeAccountRepository, IamAccountSagas } from './account';
import { IamUserHandlers, IamUserServices, IamUserModel, IamIUserRepository, IamSequelizeUserRepository, IamUserSagas } from './user';
import { IamRoleAccountHandlers, IamRoleAccountServices, IamRoleAccountModel, IamRoleAccountSagas, IamIRoleAccountRepository, IamSequelizeRoleAccountRepository } from './role-account';
import { IamTenantAccountHandlers, IamTenantAccountServices, IamTenantAccountModel, IamITenantAccountRepository, IamSequelizeTenantAccountRepository, IamTenantAccountSagas } from './tenant-account';

export const IamHandlers = [
    ...IamBoundedContextHandlers,
    ...IamPermissionHandlers,
    ...IamPermissionRoleHandlers,
    ...IamTenantHandlers,
    ...IamRoleHandlers,
    ...IamAccountHandlers,
    ...IamUserHandlers,
    ...IamRoleAccountHandlers,
    ...IamTenantAccountHandlers
];
export const IamServices = [
    ...IamBoundedContextServices,
    ...IamPermissionServices,
    ...IamPermissionRoleServices,
    ...IamTenantServices,
    ...IamRoleServices,
    ...IamAccountServices,
    ...IamUserServices,
    ...IamRoleAccountServices,
    ...IamTenantAccountServices
];
export const IamModels = [
    IamBoundedContextModel,
    IamPermissionModel,
    IamTenantModel,
    IamRoleModel,
    IamAccountModel,
    IamUserModel,
    IamPermissionRoleModel,
    IamRoleAccountModel,
    IamTenantAccountModel
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
    },
    {
        provide : IamIRoleAccountRepository,
        useClass: IamSequelizeRoleAccountRepository
    },
    {
        provide : IamITenantAccountRepository,
        useClass: IamSequelizeTenantAccountRepository
    }
];
export const IamSagas = [
    IamRoleSagas,
    IamPermissionSagas,
    IamRoleSagas,
    IamBoundedContextSagas,
    IamAccountSagas,
    IamUserSagas,
    IamTenantSagas,
    IamPermissionRoleSagas,
    IamRoleAccountSagas,
    IamTenantAccountSagas
];
