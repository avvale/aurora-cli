import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { IamSeeder } from './iam.seeder';
import { IamModels, IamHandlers, IamServices, IamRepositories, IamSagas } from '@app/iam';
import { IamBoundedContextApiHandlers, IamBoundedContextApiControllers, IamBoundedContextApiResolvers, IamBoundedContextApiServices } from './bounded-context';
import { IamPermissionApiHandlers, IamPermissionApiControllers, IamPermissionApiResolvers, IamPermissionApiServices } from './permission';
import { IamPermissionRoleApiHandlers, IamPermissionRoleApiControllers, IamPermissionRoleApiResolvers, IamPermissionRoleApiServices } from './permission-role';
import { IamTenantApiHandlers, IamTenantApiControllers, IamTenantApiResolvers, IamTenantApiServices } from './tenant';
import { IamRoleApiHandlers, IamRoleApiControllers, IamRoleApiResolvers, IamRoleApiServices } from './role';
import { IamAccountApiHandlers, IamAccountApiControllers, IamAccountApiResolvers, IamAccountApiServices } from './account';
import { IamUserApiHandlers, IamUserApiControllers, IamUserApiResolvers, IamUserApiServices } from './user';
import { IamUserMetaControllers, IamUserMetaResolvers, IamUserMetaApiHandlers } from './user-meta';
import { IamRoleAccountApiControllers, IamRoleAccountApiResolvers, IamRoleAccountApiHandlers, IamRoleAccountApiServices } from './role-account';
import { IamTenantAccountApiControllers, IamTenantAccountApiResolvers, IamTenantAccountApiHandlers, IamTenantAccountApiServices } from './tenant-account';
import { IamTagApiControllers, IamTagApiResolvers, IamTagApiHandlers, IamTagApiServices } from './tag';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...IamModels,
        ]),
    ],
    controllers: [
        ...IamUserMetaControllers,
        ...IamBoundedContextApiControllers,
        ...IamPermissionApiControllers,
        ...IamPermissionRoleApiControllers,
        ...IamRoleApiControllers,
        ...IamRoleAccountApiControllers,
        ...IamAccountApiControllers,
        ...IamTenantAccountApiControllers,
        ...IamTenantApiControllers,
        ...IamUserApiControllers,
        ...IamTagApiControllers
    ],
    providers: [
        IamSeeder,
        ...IamAccountApiHandlers,
        ...IamBoundedContextApiHandlers,
        ...IamHandlers,
        ...IamPermissionApiHandlers,
        ...IamPermissionRoleApiHandlers,
        ...IamRepositories,
        ...IamRoleApiHandlers,
        ...IamSagas,
        ...IamServices,
        ...IamTenantApiHandlers,
        ...IamUserApiHandlers,
        ...IamUserMetaApiHandlers,
        ...IamUserMetaResolvers,
        ...IamBoundedContextApiResolvers,
        ...IamBoundedContextApiServices,
        ...IamPermissionApiResolvers,
        ...IamPermissionApiServices,
        ...IamPermissionRoleApiResolvers,
        ...IamPermissionRoleApiServices,
        ...IamRoleApiResolvers,
        ...IamRoleApiServices,
        ...IamRoleAccountApiResolvers,
        ...IamRoleAccountApiHandlers,
        ...IamRoleAccountApiServices,
        ...IamAccountApiResolvers,
        ...IamAccountApiServices,
        ...IamTenantAccountApiResolvers,
        ...IamTenantAccountApiHandlers,
        ...IamTenantAccountApiServices,
        ...IamTenantApiResolvers,
        ...IamTenantApiServices,
        ...IamUserApiResolvers,
        ...IamUserApiServices,
        ...IamTagApiResolvers,
        ...IamTagApiHandlers,
        ...IamTagApiServices
    ],
})
export class IamModule {}
