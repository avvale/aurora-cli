/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamPermissionModel } from '@app/iam/permission';
import { IamRoleModel } from '@app/iam/role';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'IamPermissionRole',
    freezeTableName: true,
    timestamps: false,
})
export class IamPermissionRoleModel extends Model<IamPermissionRoleModel>
{
    @AfterCreate
    static auditingCreate(instance: IamPermissionRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamPermissionRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamPermissionRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamPermissionRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamPermissionRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamPermissionRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/permission-role/infrastructure/sequelize/iam-sequelize-permission-role.model',
            'IamPermissionRoleModel',
        );
    }

    @ForeignKey(() => IamPermissionModel)
    @Column({
        field: 'permissionId',
        primaryKey: true,
        allowNull: false,
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
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    roleId: string;

    @BelongsTo(() => IamRoleModel, {
        constraints: false,
        foreignKey: 'roleId',
    })
    role: IamRoleModel;

}
