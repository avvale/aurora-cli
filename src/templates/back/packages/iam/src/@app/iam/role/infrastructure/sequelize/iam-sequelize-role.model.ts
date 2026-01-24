/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { IamPermissionModel } from '@app/iam/permission';
import { IamPermissionRoleModel } from '@app/iam/permission-role';
import { IamRoleAccountModel } from '@app/iam/role-account';
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
  BelongsToMany,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  modelName: 'IamRole',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['rowId'],
      unique: true,
    },
  ],
})
export class IamRoleModel extends Model<IamRoleModel> {
  @AfterCreate
  static auditingCreate(instance: IamRoleModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.CREATED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
    );
  }

  @AfterBulkCreate
  static auditingBulkCreate(instance: IamRoleModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.BULK_CREATED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
    );
  }

  @AfterUpdate
  static auditingUpdate(instance: IamRoleModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPDATED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
    );
  }

  @AfterBulkUpdate
  static auditingBulkUpdate(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_UPDATED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
    );
  }

  @AfterDestroy
  static auditingDestroy(instance: IamRoleModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.DELETED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
    );
  }

  @AfterBulkDestroy
  static auditingBulkDestroy(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_DELETED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
    );
  }

  @AfterRestore
  static auditingRestore(instance: IamRoleModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.RESTORED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
    );
  }

  @AfterBulkRestore
  static auditingBulkRestore(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_RESTORED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
    );
  }

  @AfterUpsert
  static auditingUpsert(instance: IamRoleModel, options): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPSERTED,
      '@app/iam/role/infrastructure/sequelize/iam-sequelize-role.model',
      'IamRoleModel',
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
    type: DataTypes.STRING(128),
  })
  name: string;

  @Column({
    field: 'defaultRedirection',
    allowNull: true,
    type: DataTypes.STRING(2046),
  })
  defaultRedirection: string;

  @Column({
    field: 'hasHiddenVerticalNavigation',
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  hasHiddenVerticalNavigation: boolean;

  @Column({
    field: 'isMaster',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  isMaster: boolean;

  @BelongsToMany(() => IamPermissionModel, {
    through: () => IamPermissionRoleModel,
    uniqueKey: 'Uq01IamPermissionRole',
  })
  permissions: IamPermissionModel[];

  @BelongsToMany(() => IamAccountModel, {
    through: () => IamRoleAccountModel,
    uniqueKey: 'Uq01IamRoleAccount',
  })
  accounts: IamAccountModel[];

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
