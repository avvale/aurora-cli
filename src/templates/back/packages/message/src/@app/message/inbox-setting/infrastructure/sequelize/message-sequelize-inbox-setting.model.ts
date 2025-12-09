/* eslint-disable indent */
/* eslint-disable key-spacing */
import {
    AuditingSideEffectEvent,
    SequelizeAuditingAgent,
} from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import {
    AfterBulkCreate,
    AfterBulkDestroy,
    AfterBulkRestore,
    AfterBulkUpdate,
    AfterCreate,
    AfterDestroy,
    AfterRestore,
    AfterUpdate,
    AfterUpsert,
    Column,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    modelName: 'MessageInboxSetting',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['rowId'],
            unique: true,
        },
        {
            fields: ['accountId'],
            unique: true,
        },
    ],
})
export class MessageInboxSettingModel extends Model<MessageInboxSettingModel> {
    @AfterCreate
    static auditingCreate(instance: MessageInboxSettingModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(
        instance: MessageInboxSettingModel,
        options,
    ): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: MessageInboxSettingModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: MessageInboxSettingModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: MessageInboxSettingModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: MessageInboxSettingModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/message/inbox-setting/infrastructure/sequelize/message-sequelize-inbox-setting.model',
            'MessageInboxSettingModel',
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
        field: 'rowId',
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.BIGINT,
    })
    rowId: number;

    @Column({
        field: 'accountId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    accountId: string;

    @Column({
        field: 'lastReadMessageRowId',
        allowNull: false,
        type: DataTypes.BIGINT,
    })
    lastReadMessageRowId: number;

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
