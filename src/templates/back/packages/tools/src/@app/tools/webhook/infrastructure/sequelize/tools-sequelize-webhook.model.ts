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
  modelName: 'ToolsWebhook',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['rowId'],
      unique: true,
    },
    {
      fields: ['externalId'],
      unique: false,
    },
  ],
})
export class ToolsWebhookModel extends Model<ToolsWebhookModel> {
  @AfterCreate
  static auditingCreate(instance: ToolsWebhookModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.CREATED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
    );
  }

  @AfterBulkCreate
  static auditingBulkCreate(instance: ToolsWebhookModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.BULK_CREATED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
    );
  }

  @AfterUpdate
  static auditingUpdate(instance: ToolsWebhookModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPDATED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
    );
  }

  @AfterBulkUpdate
  static auditingBulkUpdate(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_UPDATED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
    );
  }

  @AfterDestroy
  static auditingDestroy(instance: ToolsWebhookModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.DELETED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
    );
  }

  @AfterBulkDestroy
  static auditingBulkDestroy(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_DELETED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
    );
  }

  @AfterRestore
  static auditingRestore(instance: ToolsWebhookModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.RESTORED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
    );
  }

  @AfterBulkRestore
  static auditingBulkRestore(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_RESTORED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
    );
  }

  @AfterUpsert
  static auditingUpsert(instance: ToolsWebhookModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPSERTED,
      '@app/tools/webhook/infrastructure/sequelize/tools-sequelize-webhook.model',
      'ToolsWebhookModel',
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
    field: 'name',
    allowNull: false,
    type: DataTypes.STRING(255),
  })
  name: string;

  @Column({
    field: 'service',
    allowNull: false,
    type: DataTypes.STRING(255),
  })
  service: string;

  @Column({
    field: 'endpoint',
    allowNull: false,
    type: DataTypes.STRING(255),
  })
  endpoint: string;

  @Column({
    field: 'externalId',
    allowNull: true,
    type: DataTypes.STRING(64),
  })
  externalId: string;

  @Column({
    field: 'events',
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.STRING()),
  })
  events: string[];

  @Column({
    field: 'secret',
    allowNull: true,
    type: DataTypes.STRING(128),
  })
  secret: string;

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
