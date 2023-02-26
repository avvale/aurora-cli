/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurora-ts/core';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamPermissionModel } from '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model';
import { IamPermissionsRolesModel } from '@app/iam/permission-role/infrastructure/sequelize/sequelize-permissions-roles.model';
import { IamAccountModel } from '@app/iam/account/infrastructure/sequelize/sequelize-account.model';
import { IamRolesAccountsModel } from '@app/iam/role/infrastructure/sequelize/sequelize-roles-accounts.model';

@Table({
    modelName: 'IamRole',
    freezeTableName: true,
    timestamps: false,
})
export class IamRoleModel extends Model<IamRoleModel>
{
    @AfterCreate
    static auditingCreate(instance: IamRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamRoleModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/role/infrastructure/sequelize/sequelize-role.model',
            'IamRoleModel',
        );
    }

    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'isMaster',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isMaster: boolean;


    @BelongsToMany(() => IamPermissionModel, {
        through: () => IamPermissionsRolesModel,
        uniqueKey: 'Uq01IamPermissionsRoles',
    })
    permissions: IamPermissionModel[];


    @BelongsToMany(() => IamAccountModel, {
        through: () => IamRolesAccountsModel,
        uniqueKey: 'Uq01IamRolesAccounts',
    })
    accounts: IamAccountModel[];

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}