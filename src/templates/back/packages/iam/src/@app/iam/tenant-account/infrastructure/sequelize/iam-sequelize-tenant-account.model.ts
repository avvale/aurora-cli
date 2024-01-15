/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { IamTenantModel } from '@app/iam/tenant';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'IamTenantAccount',
    freezeTableName: true,
    timestamps: false,
})
export class IamTenantAccountModel extends Model<IamTenantAccountModel>
{
    @AfterCreate
    static auditingCreate(instance: IamTenantAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamTenantAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamTenantAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamTenantAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamTenantAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamTenantAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/tenant-account/infrastructure/sequelize/iam-sequelize-tenant-account.model',
            'IamTenantAccountModel',
        );
    }

    @ForeignKey(() => IamTenantModel)
    @Column({
        field: 'tenantId',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    tenantId: string;

    @BelongsTo(() => IamTenantModel, {
        constraints: false,
        foreignKey: 'tenantId',
    })
    tenant: IamTenantModel;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'accountId',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    accountId: string;

    @BelongsTo(() => IamAccountModel, {
        constraints: false,
        foreignKey: 'accountId',
    })
    account: IamAccountModel;

}
