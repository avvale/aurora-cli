/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'IamUser',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['accountId'],
			unique: false,
		},
		{
			fields: ['username'],
			unique: true,
		},

    ],
})
export class IamUserModel extends Model<IamUserModel>
{
    @AfterCreate
    static auditingCreate(instance: IamUserModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamUserModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamUserModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamUserModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamUserModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamUserModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/user/infrastructure/sequelize/iam-sequelize-user.model',
            'IamUserModel',
        );
    }

    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'accountId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    accountId: string;

    @BelongsTo(() => IamAccountModel, {
        foreignKey: 'accountId',
    })
    account: IamAccountModel;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(127),
    })
    name: string;

    @Column({
        field: 'surname',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    surname: string;

    @Column({
        field: 'avatar',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    avatar: string;

    @Column({
        field: 'mobile',
        allowNull: true,
        type: DataTypes.STRING(63),
    })
    mobile: string;

    @Column({
        field: 'langId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    langId: string;

    @Column({
        field: 'username',
        allowNull: false,
        type: DataTypes.STRING(127),
    })
    username: string;

    @Column({
        field: 'password',
        allowNull: false,
        type: DataTypes.STRING(undefined),
    })
    password: string;

    @Column({
        field: 'rememberToken',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    rememberToken: string;

    @Column({
        field: 'meta',
        allowNull: true,
        type: DataTypes.JSON,
    })
    meta: any;

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
