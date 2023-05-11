/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamUserModel } from '@app/iam/user/infrastructure/sequelize/sequelize-user.model';
import { OAuthClientModel } from '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model';
import { IamRoleModel } from '@app/iam/role/infrastructure/sequelize/sequelize-role.model';
import { IamRolesAccountsModel } from '@app/iam/role/infrastructure/sequelize/sequelize-roles-accounts.model';
import { IamTenantModel } from '@app/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { IamTenantsAccountsModel } from '@app/iam/tenant/infrastructure/sequelize/sequelize-tenants-accounts.model';

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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
            '@app/iam/account/infrastructure/sequelize/sequelize-account.model',
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
        type: DataTypes.STRING(50),
    })
    code: string;

    @Column({
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING(120),
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
        field: 'scopes',
        allowNull: true,
        type: DataTypes.JSON,
    })
    scopes: any;

    @Column({
        field: 'dApplicationCodes',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dApplicationCodes: any;

    @Column({
        field: 'dPermissions',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dPermissions: any;

    @Column({
        field: 'dTenants',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dTenants: any;

    @Column({
        field: 'meta',
        allowNull: true,
        type: DataTypes.JSON,
    })
    meta: any;


    @BelongsToMany(() => IamRoleModel, {
        through: () => IamRolesAccountsModel,
        uniqueKey: 'Uq01IamRolesAccounts',
    })
    roles: IamRoleModel[];


    @BelongsToMany(() => IamTenantModel, {
        through: () => IamTenantsAccountsModel,
        uniqueKey: 'Uq01IamTenantsAccounts',
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