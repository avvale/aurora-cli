/* eslint-disable indent */
/* eslint-disable key-spacing */
import { MessageMessageModel } from '@app/message/message';
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
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  modelName: 'MessageInbox',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['rowId'],
      unique: true,
    },
    {
      fields: ['accountId'],
      unique: false,
    },
    {
      fields: ['accountCode'],
      unique: false,
    },
  ],
})
export class MessageInboxModel extends Model<MessageInboxModel> {
  @AfterCreate
  static auditingCreate(instance: MessageInboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.CREATED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
    );
  }

  @AfterBulkCreate
  static auditingBulkCreate(instance: MessageInboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.BULK_CREATED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
    );
  }

  @AfterUpdate
  static auditingUpdate(instance: MessageInboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPDATED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
    );
  }

  @AfterBulkUpdate
  static auditingBulkUpdate(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_UPDATED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
    );
  }

  @AfterDestroy
  static auditingDestroy(instance: MessageInboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.DELETED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
    );
  }

  @AfterBulkDestroy
  static auditingBulkDestroy(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_DELETED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
    );
  }

  @AfterRestore
  static auditingRestore(instance: MessageInboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.RESTORED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
    );
  }

  @AfterBulkRestore
  static auditingBulkRestore(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_RESTORED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
    );
  }

  @AfterUpsert
  static auditingUpsert(instance: MessageInboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPSERTED,
      '@app/message/inbox/infrastructure/sequelize/message-sequelize-inbox.model',
      'MessageInboxModel',
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
    field: 'tenantIds',
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.UUID),
  })
  tenantIds: string[];

  @ForeignKey(() => MessageMessageModel)
  @Column({
    field: 'messageId',
    allowNull: true,
    type: DataTypes.UUID,
  })
  messageId: string;

  @BelongsTo(() => MessageMessageModel, {
    constraints: false,
    foreignKey: 'messageId',
  })
  message: MessageMessageModel;

  @Column({
    field: 'messageRowId',
    allowNull: false,
    type: DataTypes.BIGINT,
  })
  messageRowId: number;

  @Column({
    field: 'accountId',
    allowNull: false,
    type: DataTypes.UUID,
  })
  accountId: string;

  @Column({
    field: 'accountCode',
    allowNull: true,
    type: DataTypes.STRING(128),
  })
  accountCode: string;

  @Column({
    field: 'isImportant',
    allowNull: false,
    type: DataTypes.BOOLEAN,
  })
  isImportant: boolean;

  @Column({
    field: 'sentAt',
    allowNull: false,
    type: DataTypes.DATE,
  })
  sentAt: string;

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
    field: 'isRead',
    allowNull: false,
    type: DataTypes.BOOLEAN,
  })
  isRead: boolean;

  @Column({
    field: 'isReadAtLeastOnce',
    allowNull: false,
    type: DataTypes.BOOLEAN,
  })
  isReadAtLeastOnce: boolean;

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
