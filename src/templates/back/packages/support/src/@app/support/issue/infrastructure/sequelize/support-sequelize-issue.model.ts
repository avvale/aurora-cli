/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { SupportCommentModel } from '@app/support/comment';
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
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  modelName: 'SupportIssue',
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
    {
      fields: ['accountId'],
      unique: false,
    },
  ],
})
export class SupportIssueModel extends Model<SupportIssueModel> {
  @AfterCreate
  static auditingCreate(instance: SupportIssueModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.CREATED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
    );
  }

  @AfterBulkCreate
  static auditingBulkCreate(instance: SupportIssueModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.BULK_CREATED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
    );
  }

  @AfterUpdate
  static auditingUpdate(instance: SupportIssueModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPDATED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
    );
  }

  @AfterBulkUpdate
  static auditingBulkUpdate(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_UPDATED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
    );
  }

  @AfterDestroy
  static auditingDestroy(instance: SupportIssueModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.DELETED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
    );
  }

  @AfterBulkDestroy
  static auditingBulkDestroy(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_DELETED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
    );
  }

  @AfterRestore
  static auditingRestore(instance: SupportIssueModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.RESTORED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
    );
  }

  @AfterBulkRestore
  static auditingBulkRestore(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_RESTORED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
    );
  }

  @AfterUpsert
  static auditingUpsert(instance: SupportIssueModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPSERTED,
      '@app/support/issue/infrastructure/sequelize/support-sequelize-issue.model',
      'SupportIssueModel',
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
    field: 'externalId',
    allowNull: true,
    type: DataTypes.STRING(64),
  })
  externalId: string;

  @Column({
    field: 'externalStatus',
    allowNull: true,
    type: DataTypes.STRING(36),
  })
  externalStatus: string;

  @Column({
    field: 'externalColorStatus',
    allowNull: true,
    type: DataTypes.STRING(16),
  })
  externalColorStatus: string;

  @ForeignKey(() => IamAccountModel)
  @Column({
    field: 'accountId',
    allowNull: true,
    type: DataTypes.UUID,
  })
  accountId: string;

  @BelongsTo(() => IamAccountModel, {
    constraints: false,
    foreignKey: 'accountId',
  })
  account: IamAccountModel;

  @Column({
    field: 'accountUsername',
    allowNull: true,
    type: DataTypes.STRING(128),
  })
  accountUsername: string;

  @Column({
    field: 'displayName',
    allowNull: true,
    type: DataTypes.STRING(128),
  })
  displayName: string;

  @Column({
    field: 'frontEnvironment',
    allowNull: true,
    type: DataTypes.STRING(36),
  })
  frontEnvironment: string;

  @Column({
    field: 'frontVersion',
    allowNull: true,
    type: DataTypes.STRING(16),
  })
  frontVersion: string;

  @Column({
    field: 'backEnvironment',
    allowNull: true,
    type: DataTypes.STRING(36),
  })
  backEnvironment: string;

  @Column({
    field: 'backVersion',
    allowNull: true,
    type: DataTypes.STRING(16),
  })
  backVersion: string;

  @Column({
    field: 'subject',
    allowNull: false,
    type: DataTypes.STRING(510),
  })
  subject: string;

  @Column({
    field: 'description',
    allowNull: false,
    type: DataTypes.TEXT,
  })
  description: string;

  @Column({
    field: 'attachments',
    allowNull: true,
    type: DataTypes.JSONB,
  })
  attachments: any;

  @Column({
    field: 'screenRecording',
    allowNull: true,
    type: DataTypes.JSONB,
  })
  screenRecording: any;

  @HasMany(() => SupportCommentModel, {
    constraints: false,
  })
  comments: SupportCommentModel[];

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
