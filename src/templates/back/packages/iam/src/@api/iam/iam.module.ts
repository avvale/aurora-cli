import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { IamSeeder } from './iam.seeder';
import { IamModels, IamHandlers, IamServices, IamRepositories, IamSagas } from '@app/iam';
import { IamBoundedContextControllers, IamBoundedContextResolvers, IamBoundedContextApiHandlers, IamBoundedContextServices } from './bounded-context';
import { IamPermissionControllers, IamPermissionResolvers, IamPermissionApiHandlers, IamPermissionServices } from './permission';
import { IamPermissionRoleControllers, IamPermissionRoleResolvers, IamPermissionRoleApiHandlers } from './permission-role';
import { IamTenantControllers, IamTenantResolvers, IamTenantApiHandlers, IamTenantServices } from './tenant';
import { IamRoleControllers, IamRoleResolvers, IamRoleApiHandlers, IamRoleServices } from './role';
import { IamAccountControllers, IamAccountResolvers, IamAccountApiHandlers, IamAccountServices } from './account';
import { IamUserControllers, IamUserResolvers, IamUserApiHandlers, IamUserServices } from './user';
import { IamUserMetaControllers, IamUserMetaResolvers, IamUserMetaApiHandlers } from './user-meta';
import { IamCreatePermissionsFromRolesService } from '@app/iam/permission-role/application/services/iam-create-permissions-from-roles.service';
import { BullModule } from '@nestjs/bull';
import { appQueues } from 'src/app.queues';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...IamModels,
        ]),
        BullModule.registerQueue(
            ...appQueues.iam,
        ),
    ],
    controllers: [
        ...IamAccountControllers,
        ...IamBoundedContextControllers,
        ...IamPermissionControllers,
        ...IamPermissionRoleControllers,
        ...IamRoleControllers,
        ...IamTenantControllers,
        ...IamUserControllers,
        ...IamUserMetaControllers,
    ],
    providers: [
        IamSeeder,
        ...IamAccountApiHandlers,
        ...IamAccountResolvers,
        ...IamBoundedContextApiHandlers,
        ...IamBoundedContextResolvers,
        ...IamHandlers,
        ...IamPermissionApiHandlers,
        ...IamPermissionResolvers,
        ...IamPermissionRoleApiHandlers,
        ...IamPermissionRoleResolvers,
        ...IamRepositories,
        ...IamRoleApiHandlers,
        ...IamRoleResolvers,
        ...IamSagas,
        ...IamServices,
        ...IamTenantApiHandlers,
        ...IamTenantResolvers,
        ...IamUserApiHandlers,
        ...IamUserMetaApiHandlers,
        ...IamUserMetaResolvers,
        ...IamUserResolvers,
        ...IamAccountServices,

        // ---- customizations ----
        IamCreatePermissionsFromRolesService,
        ...IamPermissionServices,
        ...IamBoundedContextServices,
        ...IamRoleServices,
        ...IamTenantServices,
        ...IamUserServices,
    ],
})
export class IamModule {}
