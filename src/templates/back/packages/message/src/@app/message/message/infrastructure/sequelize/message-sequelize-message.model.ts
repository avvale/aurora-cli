/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'MessageMessage',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['accountRecipientIds'],
			unique: false,
		},
		{
			fields: ['tenantRecipientIds'],
			unique: false,
		},
		{
			fields: ['scopeRecipients'],
			unique: false,
		},
		{
			fields: ['tagRecipients'],
			unique: false,
		},
    ],
})
export class MessageMessageModel extends Model<MessageMessageModel>
{
    @AfterCreate
    static auditingCreate(instance: MessageMessageModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: MessageMessageModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: MessageMessageModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: MessageMessageModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: MessageMessageModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: MessageMessageModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/message/message/infrastructure/sequelize/message-sequelize-message.model',
            'MessageMessageModel',
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
        field: 'tenantIds',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.UUID),
    })
    tenantIds: string[];

    @Column({
        field: 'status',
        allowNull: false,
        type: DataTypes.ENUM('DRAFT','PENDING','SENT'),
    })
    status: string;

    @Column({
        field: 'accountRecipientIds',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.UUID),
    })
    accountRecipientIds: string[];

    @Column({
        field: 'tenantRecipientIds',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.UUID),
    })
    tenantRecipientIds: string[];

    @Column({
        field: 'scopeRecipients',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING(64)),
    })
    scopeRecipients: string[];

    @Column({
        field: 'tagRecipients',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING(64)),
    })
    tagRecipients: string[];

    @Column({
        field: 'sendAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    sendAt: string;

    @Column({
        field: 'isImportant',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isImportant: boolean;

    @Column({
        field: 'subject',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    subject: string;

    @Column({
        field: 'body',
        allowNull: false,
        type: DataTypes.TEXT,
    })
    body: string;

    @Column({
        field: 'link',
        allowNull: true,
        type: DataTypes.STRING(2046),
    })
    link: string;

    @Column({
        field: 'isInternalLink',
        allowNull: true,
        type: DataTypes.BOOLEAN,
    })
    isInternalLink: boolean;

    @Column({
        field: 'image',
        allowNull: true,
        type: DataTypes.JSONB,
    })
    image: any;

    @Column({
        field: 'icon',
        allowNull: true,
        type: DataTypes.STRING(64),
    })
    icon: string;

    @Column({
        field: 'attachments',
        allowNull: true,
        type: DataTypes.JSONB,
    })
    attachments: any;

    @Column({
        field: 'totalRecipients',
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
    })
    totalRecipients: number;

    @Column({
        field: 'reads',
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
    })
    reads: number;

    @Column({
        field: 'meta',
        allowNull: true,
        type: DataTypes.JSONB,
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
