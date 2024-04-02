/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamRoleModel } from '@app/iam/role';
import { IamRoleAccountModel } from '@app/iam/role-account';
import { IamTenantModel } from '@app/iam/tenant';
import { IamTenantAccountModel } from '@app/iam/tenant-account';
import { IamUserModel } from '@app/iam/user';
import { OAuthClientModel } from '@app/o-auth/client';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, BelongsToMany, Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'IamAccount',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['code'],
			unique: true,
		},
		{
			fields: ['email'],
			unique: true,
		},
		{
			fields: ['tags'],
			unique: false,
		},
    ],
})
export class IamAccountModel extends Model<IamAccountModel>
{
    @AfterCreate
    static auditingCreate(instance: IamAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamAccountModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model',
            'IamAccountModel',
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
        field: 'type',
        allowNull: false,
        type: DataTypes.ENUM('USER','SERVICE'),
    })
    type: string;

    @Column({
        field: 'code',
        allowNull: true,
        type: DataTypes.STRING(64),
    })
    code: string;

    @Column({
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING(128),
    })
    email: string;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isActive: boolean;

    @ForeignKey(() => OAuthClientModel)
    @Column({
        field: 'clientId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    clientId: string;

    @BelongsTo(() => OAuthClientModel, {
        constraints: false,
        foreignKey: 'clientId',
    })
    client: OAuthClientModel;

    @Column({
        field: 'tags',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING(64)),
    })
    tags: string[];

    @Column({
        field: 'scopes',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING(64)),
    })
    scopes: string[];

    @Column({
        field: 'dApplicationCodes',
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING()),
    })
    dApplicationCodes: string[];

    @Column({
        field: 'dPermissions',
        allowNull: false,
        type: DataTypes.JSONB,
    })
    dPermissions: any;

    @Column({
        field: 'dTenants',
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.UUID),
    })
    dTenants: string[];

    @Column({
        field: 'meta',
        allowNull: true,
        type: DataTypes.JSONB,
    })
    meta: any;


    @BelongsToMany(() => IamRoleModel, {
        through: () => IamRoleAccountModel,
        uniqueKey: 'Uq01IamRoleAccount',
    })
    roles: IamRoleModel[];


    @BelongsToMany(() => IamTenantModel, {
        through: () => IamTenantAccountModel,
        uniqueKey: 'Uq01IamTenantAccount',
    })
    tenants: IamTenantModel[];


    @HasOne(() => IamUserModel)
    user: IamUserModel;

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
