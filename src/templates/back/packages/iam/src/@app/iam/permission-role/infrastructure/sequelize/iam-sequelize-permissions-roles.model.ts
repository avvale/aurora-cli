/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamPermissionModel } from '@app/iam/permission';
import { IamRoleModel } from '@app/iam/role';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'IamPermissionsRoles',
    freezeTableName: true,
    timestamps: false,
})
export class IamPermissionsRolesModel extends Model<IamPermissionsRolesModel>
{
    @AfterCreate
    static auditingCreate(instance: IamPermissionsRolesModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/permission-role/infrastructure/sequelize/sequelize-permissions-roles.model',
            'IamPermissionsRolesModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamPermissionsRolesModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionsRolesModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamPermissionsRolesModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionsRolesModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionsRolesModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamPermissionsRolesModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionsRolesModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionsRolesModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamPermissionsRolesModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionsRolesModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionsRolesModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamPermissionsRolesModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionsRolesModel',
        );
    }

    @ForeignKey(() => IamPermissionModel)
    @Column({
        field: 'permissionId',
        type: DataTypes.UUID,
    })
    permissionId: string;

    @BelongsTo(() => IamPermissionModel, {
        constraints: false,
        foreignKey: 'permissionId',
    })
    permission: IamPermissionModel;

    @ForeignKey(() => IamRoleModel)
    @Column({
        field: 'roleId',
        type: DataTypes.UUID,
    })
    roleId: string;

    @BelongsTo(() => IamRoleModel, {
        constraints: false,
        foreignKey: 'roleId',
    })
    role: IamRoleModel;
}