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
  modelName: 'MessageOutbox',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['rowId'],
      unique: true,
    },
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
export class MessageOutboxModel extends Model<MessageOutboxModel> {
  @AfterCreate
  static auditingCreate(instance: MessageOutboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.CREATED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
    );
  }

  @AfterBulkCreate
  static auditingBulkCreate(instance: MessageOutboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.BULK_CREATED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
    );
  }

  @AfterUpdate
  static auditingUpdate(instance: MessageOutboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPDATED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
    );
  }

  @AfterBulkUpdate
  static auditingBulkUpdate(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_UPDATED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
    );
  }

  @AfterDestroy
  static auditingDestroy(instance: MessageOutboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.DELETED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
    );
  }

  @AfterBulkDestroy
  static auditingBulkDestroy(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_DELETED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
    );
  }

  @AfterRestore
  static auditingRestore(instance: MessageOutboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.RESTORED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
    );
  }

  @AfterBulkRestore
  static auditingBulkRestore(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_RESTORED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
    );
  }

  @AfterUpsert
  static auditingUpsert(instance: MessageOutboxModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPSERTED,
      '@app/message/outbox/infrastructure/sequelize/message-sequelize-outbox.model',
      'MessageOutboxModel',
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

  @ForeignKey(() => MessageMessageModel)
  @Column({
    field: 'messageId',
    allowNull: false,
    type: DataTypes.UUID,
  })
  messageId: string;

  @BelongsTo(() => MessageMessageModel, {
    constraints: false,
    foreignKey: 'messageId',
  })
  message: MessageMessageModel;

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
