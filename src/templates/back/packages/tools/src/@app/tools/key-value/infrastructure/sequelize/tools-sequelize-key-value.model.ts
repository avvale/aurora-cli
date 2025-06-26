/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'ToolsKeyValue',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['key'],
			unique: true,
		},
    ],
})
export class ToolsKeyValueModel extends Model<ToolsKeyValueModel>
{
    @AfterCreate
    static auditingCreate(instance: ToolsKeyValueModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: ToolsKeyValueModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: ToolsKeyValueModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: ToolsKeyValueModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: ToolsKeyValueModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: ToolsKeyValueModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/tools/key-value/infrastructure/sequelize/tools-sequelize-key-value.model',
            'ToolsKeyValueModel',
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
        field: 'key',
        allowNull: false,
        type: DataTypes.STRING(64),
    })
    key: string;

    @Column({
        field: 'type',
        allowNull: false,
        type: DataTypes.ENUM('STRING','BOOLEAN','NUMBER','DATE','TIME','TIMESTAMP','OBJECT','ARRAY'),
    })
    type: string;

    @Column({
        field: 'value',
        allowNull: false,
        type: DataTypes.TEXT,
    })
    value: string;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    })
    isActive: boolean;

    @Column({
        field: 'description',
        allowNull: true,
        type: DataTypes.TEXT,
    })
    description: string;

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
