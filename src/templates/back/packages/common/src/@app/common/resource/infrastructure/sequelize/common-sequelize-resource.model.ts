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
  modelName: 'CommonResource',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['code'],
      unique: true,
    },
  ],
})
export class CommonResourceModel extends Model<CommonResourceModel> {
  @AfterCreate
  static auditingCreate(instance: CommonResourceModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.CREATED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
    );
  }

  @AfterBulkCreate
  static auditingBulkCreate(instance: CommonResourceModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.BULK_CREATED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
    );
  }

  @AfterUpdate
  static auditingUpdate(instance: CommonResourceModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPDATED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
    );
  }

  @AfterBulkUpdate
  static auditingBulkUpdate(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_UPDATED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
    );
  }

  @AfterDestroy
  static auditingDestroy(instance: CommonResourceModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.DELETED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
    );
  }

  @AfterBulkDestroy
  static auditingBulkDestroy(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_DELETED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
    );
  }

  @AfterRestore
  static auditingRestore(instance: CommonResourceModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.RESTORED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
    );
  }

  @AfterBulkRestore
  static auditingBulkRestore(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_RESTORED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
    );
  }

  @AfterUpsert
  static auditingUpsert(instance: CommonResourceModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPSERTED,
      '@app/common/resource/infrastructure/sequelize/common-sequelize-resource.model',
      'CommonResourceModel',
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
    field: 'isActive',
    allowNull: false,
    type: DataTypes.BOOLEAN,
  })
  isActive: boolean;

  @Column({
    field: 'hasAttachments',
    allowNull: false,
    type: DataTypes.BOOLEAN,
  })
  hasAttachments: boolean;

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
