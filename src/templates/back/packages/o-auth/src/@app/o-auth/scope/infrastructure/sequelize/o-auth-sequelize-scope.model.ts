/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'OAuthScope',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['code'],
			unique: true,
		},

    ],
})
export class OAuthScopeModel extends Model<OAuthScopeModel>
{
    @AfterCreate
    static auditingCreate(instance: OAuthScopeModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: OAuthScopeModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: OAuthScopeModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: OAuthScopeModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: OAuthScopeModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: OAuthScopeModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/o-auth/scope/infrastructure/sequelize/o-auth-sequelize-scope.model',
            'OAuthScopeModel',
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
        field: 'code',
        allowNull: false,
        type: DataTypes.STRING(63),
    })
    code: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(127),
    })
    name: string;

    @Column({
        field: 'roleIds',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.UUID),
    })
    roleIds: string[];

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
