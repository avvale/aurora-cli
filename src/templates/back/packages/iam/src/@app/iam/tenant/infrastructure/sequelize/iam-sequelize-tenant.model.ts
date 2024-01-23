/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { IamTenantAccountModel } from '@app/iam/tenant-account';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'IamTenant',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['code'],
			unique: true,
		},

    ],
})
export class IamTenantModel extends Model<IamTenantModel>
{
    @AfterCreate
    static auditingCreate(instance: IamTenantModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamTenantModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamTenantModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamTenantModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamTenantModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamTenantModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model',
            'IamTenantModel',
        );
    }

    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => IamTenantModel)
    @Column({
        field: 'parentId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    parentId: string;

    @BelongsTo(() => IamTenantModel, {
        constraints: false,
        foreignKey: 'parentId',
    })
    parent: IamTenantModel;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(127),
    })
    name: string;

    @Column({
        field: 'code',
        allowNull: true,
        type: DataTypes.STRING(63),
    })
    code: string;

    @Column({
        field: 'logo',
        allowNull: true,
        type: DataTypes.BLOB('medium'),
    })
    logo: Buffer;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isActive: boolean;

    @Column({
        field: 'meta',
        allowNull: true,
        type: DataTypes.JSON,
    })
    meta: any;


    @BelongsToMany(() => IamAccountModel, {
        through: () => IamTenantAccountModel,
        uniqueKey: 'Uq01IamTenantAccount',
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
