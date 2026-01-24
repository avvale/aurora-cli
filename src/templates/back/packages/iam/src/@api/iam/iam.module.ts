import {
  IamHandlers,
  IamModels,
  IamRepositories,
  IamSagas,
  IamServices,
} from '@app/iam';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  IamAccountApiControllers,
  IamAccountApiHandlers,
  IamAccountApiResolvers,
  IamAccountApiServices,
} from './account';
import {
  IamBoundedContextApiControllers,
  IamBoundedContextApiHandlers,
  IamBoundedContextApiResolvers,
  IamBoundedContextApiServices,
} from './bounded-context';
import { IamSeeder } from './iam.seeder';
import {
  IamPermissionApiControllers,
  IamPermissionApiHandlers,
  IamPermissionApiResolvers,
  IamPermissionApiServices,
} from './permission';
import {
  IamPermissionRoleApiControllers,
  IamPermissionRoleApiHandlers,
  IamPermissionRoleApiResolvers,
  IamPermissionRoleApiServices,
} from './permission-role';
import {
  IamRoleApiControllers,
  IamRoleApiHandlers,
  IamRoleApiResolvers,
  IamRoleApiServices,
} from './role';
import {
  IamRoleAccountApiControllers,
  IamRoleAccountApiHandlers,
  IamRoleAccountApiResolvers,
  IamRoleAccountApiServices,
} from './role-account';
import {
  IamTagApiControllers,
  IamTagApiHandlers,
  IamTagApiResolvers,
  IamTagApiServices,
} from './tag';
import {
  IamTenantApiControllers,
  IamTenantApiHandlers,
  IamTenantApiResolvers,
  IamTenantApiServices,
} from './tenant';
import {
  IamTenantAccountApiControllers,
  IamTenantAccountApiHandlers,
  IamTenantAccountApiResolvers,
  IamTenantAccountApiServices,
} from './tenant-account';
import {
  IamUserApiControllers,
  IamUserApiHandlers,
  IamUserApiResolvers,
  IamUserApiServices,
} from './user';
import {
  IamUserMetaApiHandlers,
  IamUserMetaControllers,
  IamUserMetaResolvers,
} from './user-meta';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([...IamModels])],
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
    ...IamTagApiControllers,
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
    ...IamTagApiServices,
  ],
})
export class IamModule {}
