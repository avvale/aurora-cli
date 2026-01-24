/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { SupportIssueModel } from '@app/support/issue';
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
  modelName: 'SupportComment',
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
export class SupportCommentModel extends Model<SupportCommentModel> {
  @AfterCreate
  static auditingCreate(instance: SupportCommentModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.CREATED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @AfterBulkCreate
  static auditingBulkCreate(instance: SupportCommentModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.BULK_CREATED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @AfterUpdate
  static auditingUpdate(instance: SupportCommentModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPDATED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @AfterBulkUpdate
  static auditingBulkUpdate(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_UPDATED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @AfterDestroy
  static auditingDestroy(instance: SupportCommentModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.DELETED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @AfterBulkDestroy
  static auditingBulkDestroy(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_DELETED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @AfterRestore
  static auditingRestore(instance: SupportCommentModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.RESTORED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @AfterBulkRestore
  static auditingBulkRestore(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_RESTORED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @AfterUpsert
  static auditingUpsert(instance: SupportCommentModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPSERTED,
      '@app/support/comment/infrastructure/sequelize/support-sequelize-comment.model',
      'SupportCommentModel',
    );
  }

  @Column({
    field: 'id',
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
  })
  id: string;

  @ForeignKey(() => SupportCommentModel)
  @Column({
    field: 'parentId',
    allowNull: true,
    type: DataTypes.UUID,
  })
  parentId: string;

  @BelongsTo(() => SupportCommentModel, {
    constraints: false,
    foreignKey: 'parentId',
  })
  parent: SupportCommentModel;

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

  @ForeignKey(() => SupportCommentModel)
  @Column({
    field: 'externalParentId',
    allowNull: true,
    type: DataTypes.STRING(64),
  })
  externalParentId: string;

  @BelongsTo(() => SupportCommentModel, {
    constraints: false,
    foreignKey: 'externalParentId',
  })
  externalParent: SupportCommentModel;

  @ForeignKey(() => SupportIssueModel)
  @Column({
    field: 'issueId',
    allowNull: true,
    type: DataTypes.UUID,
  })
  issueId: string;

  @BelongsTo(() => SupportIssueModel, {
    constraints: false,
    foreignKey: 'issueId',
  })
  issue: SupportIssueModel;

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
