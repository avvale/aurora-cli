import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../@aurora/shared.module';
import { IamModels, IamHandlers, IamServices, IamRepositories, IamSagas } from '../../@apps/iam';
import { IamBoundedContextControllers, IamBoundedContextResolvers, IamBoundedContextApiHandlers } from './bounded-context';
import { IamPermissionControllers, IamPermissionResolvers, IamPermissionApiHandlers } from './permission';
import { IamTenantControllers, IamTenantResolvers, IamTenantApiHandlers } from './tenant';
import { IamRoleControllers, IamRoleResolvers, IamRoleApiHandlers } from './role';
import { IamAccountControllers, IamAccountResolvers, IamAccountApiHandlers } from './account';
import { IamUserControllers, IamUserResolvers, IamUserApiHandlers } from './user';
import { IamUserDataControllers, IamUserDataResolvers, IamUserDataApiHandlers } from './user-data';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...IamModels,
        ]),
    ],
    controllers: [
        ...IamBoundedContextControllers,
        ...IamPermissionControllers,
        ...IamTenantControllers,
        ...IamRoleControllers,
        ...IamAccountControllers,
        ...IamUserControllers,
        ...IamUserDataControllers,
    ],
    providers: [
        ...IamHandlers,
        ...IamServices,
        ...IamRepositories,
        ...IamSagas,
        ...IamBoundedContextResolvers,
        ...IamPermissionResolvers,
        ...IamTenantResolvers,
        ...IamRoleResolvers,
        ...IamAccountResolvers,
        ...IamUserResolvers,
        ...IamUserDataResolvers,
        ...IamAccountApiHandlers,
        ...IamUserApiHandlers,
        ...IamRoleApiHandlers,
        ...IamPermissionApiHandlers,
        ...IamBoundedContextApiHandlers,
        ...IamTenantApiHandlers,
        ...IamUserDataApiHandlers,
    ],
})
export class IamModule {}
