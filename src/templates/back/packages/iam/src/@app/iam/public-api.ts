import {
  IamAccountHandlers,
  IamAccountModel,
  IamAccountSagas,
  IamAccountServices,
  IamIAccountRepository,
  IamSequelizeAccountRepository,
} from './account';
import {
  IamBoundedContextHandlers,
  IamBoundedContextModel,
  IamBoundedContextSagas,
  IamBoundedContextServices,
  IamIBoundedContextRepository,
  IamSequelizeBoundedContextRepository,
} from './bounded-context';
import {
  IamIPermissionRepository,
  IamPermissionHandlers,
  IamPermissionModel,
  IamPermissionSagas,
  IamPermissionServices,
  IamSequelizePermissionRepository,
} from './permission';
import {
  IamIPermissionRoleRepository,
  IamPermissionRoleHandlers,
  IamPermissionRoleModel,
  IamPermissionRoleSagas,
  IamPermissionRoleServices,
  IamSequelizePermissionRoleRepository,
} from './permission-role';
import {
  IamIRoleRepository,
  IamRoleHandlers,
  IamRoleModel,
  IamRoleSagas,
  IamRoleServices,
  IamSequelizeRoleRepository,
} from './role';
import {
  IamIRoleAccountRepository,
  IamRoleAccountHandlers,
  IamRoleAccountModel,
  IamRoleAccountSagas,
  IamRoleAccountServices,
  IamSequelizeRoleAccountRepository,
} from './role-account';
import {
  IamITagRepository,
  IamSequelizeTagRepository,
  IamTagHandlers,
  IamTagModel,
  IamTagSagas,
  IamTagServices,
} from './tag';
import {
  IamITenantRepository,
  IamSequelizeTenantRepository,
  IamTenantHandlers,
  IamTenantModel,
  IamTenantSagas,
  IamTenantServices,
} from './tenant';
import {
  IamITenantAccountRepository,
  IamSequelizeTenantAccountRepository,
  IamTenantAccountHandlers,
  IamTenantAccountModel,
  IamTenantAccountSagas,
  IamTenantAccountServices,
} from './tenant-account';
import {
  IamIUserRepository,
  IamSequelizeUserRepository,
  IamUserHandlers,
  IamUserModel,
  IamUserSagas,
  IamUserServices,
} from './user';

export const IamHandlers = [
  ...IamBoundedContextHandlers,
  ...IamPermissionHandlers,
  ...IamPermissionRoleHandlers,
  ...IamTenantHandlers,
  ...IamRoleHandlers,
  ...IamAccountHandlers,
  ...IamUserHandlers,
  ...IamRoleAccountHandlers,
  ...IamTenantAccountHandlers,
  ...IamTagHandlers,
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
  ...IamTenantAccountServices,
  ...IamTagServices,
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
  IamTenantAccountModel,
  IamTagModel,
];
export const IamRepositories = [
  /* #region customizations */
  {
    provide: IamIPermissionRoleRepository,
    useClass: IamSequelizePermissionRoleRepository,
  },
  {
    provide: IamIPermissionRepository,
    useClass: IamSequelizePermissionRepository,
  },
  {
    provide: IamIRoleRepository,
    useClass: IamSequelizeRoleRepository,
  },
  {
    provide: IamIBoundedContextRepository,
    useClass: IamSequelizeBoundedContextRepository,
  },
  {
    provide: IamIRoleAccountRepository,
    useClass: IamSequelizeRoleAccountRepository,
  },
  {
    provide: IamITenantAccountRepository,
    useClass: IamSequelizeTenantAccountRepository,
  },
  {
    provide: IamITagRepository,
    useClass: IamSequelizeTagRepository,
  },
  {
    provide: IamIAccountRepository,
    useClass: IamSequelizeAccountRepository,
  },
  {
    provide: IamIRoleAccountRepository,
    useClass: IamSequelizeRoleAccountRepository,
  },
  {
    provide: IamITenantAccountRepository,
    useClass: IamSequelizeTenantAccountRepository,
  },
  {
    provide: IamIBoundedContextRepository,
    useClass: IamSequelizeBoundedContextRepository,
  },
  {
    provide: IamIPermissionRepository,
    useClass: IamSequelizePermissionRepository,
  },
  {
    provide: IamIPermissionRoleRepository,
    useClass: IamSequelizePermissionRoleRepository,
  },
  {
    provide: IamIRoleRepository,
    useClass: IamSequelizeRoleRepository,
  },
  {
    provide: IamITagRepository,
    useClass: IamSequelizeTagRepository,
  },
  {
    provide: IamITenantRepository,
    useClass: IamSequelizeTenantRepository,
  },
  {
    provide: IamIUserRepository,
    useClass: IamSequelizeUserRepository,
  },
  /* #endregion customizations */

  {
    provide: IamIRoleRepository,
    useClass: IamSequelizeRoleRepository,
  },
  {
    provide: IamIAccountRepository,
    useClass: IamSequelizeAccountRepository,
  },
  {
    provide: IamIUserRepository,
    useClass: IamSequelizeUserRepository,
  },
  {
    provide: IamITenantRepository,
    useClass: IamSequelizeTenantRepository,
  },
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
  IamTenantAccountSagas,
  IamTagSagas,
];
