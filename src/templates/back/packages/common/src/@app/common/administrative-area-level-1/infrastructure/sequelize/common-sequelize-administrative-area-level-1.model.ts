/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonCountryModel } from '@app/common/country';
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
  modelName: 'CommonAdministrativeAreaLevel1',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['rowId'],
      unique: true,
    },
    {
      fields: ['code'],
      unique: true,
    },
    {
      fields: ['customCode'],
      unique: true,
    },
    {
      fields: ['name'],
      unique: false,
    },
    {
      fields: ['slug'],
      unique: false,
    },
  ],
})
export class CommonAdministrativeAreaLevel1Model extends Model<CommonAdministrativeAreaLevel1Model> {
  @AfterCreate
  static auditingCreate(
    instance: CommonAdministrativeAreaLevel1Model,
    options,
  ): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.CREATED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
    );
  }

  @AfterBulkCreate
  static auditingBulkCreate(
    instance: CommonAdministrativeAreaLevel1Model,
    options,
  ): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.BULK_CREATED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
    );
  }

  @AfterUpdate
  static auditingUpdate(
    instance: CommonAdministrativeAreaLevel1Model,
    options,
  ): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPDATED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
    );
  }

  @AfterBulkUpdate
  static auditingBulkUpdate(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_UPDATED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
    );
  }

  @AfterDestroy
  static auditingDestroy(
    instance: CommonAdministrativeAreaLevel1Model,
    options,
  ): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.DELETED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
    );
  }

  @AfterBulkDestroy
  static auditingBulkDestroy(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_DELETED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
    );
  }

  @AfterRestore
  static auditingRestore(
    instance: CommonAdministrativeAreaLevel1Model,
    options,
  ): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.RESTORED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
    );
  }

  @AfterBulkRestore
  static auditingBulkRestore(options): void {
    SequelizeAuditingAgent.registerSideEffect(
      null,
      options,
      AuditingSideEffectEvent.BULK_RESTORED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
    );
  }

  @AfterUpsert
  static auditingUpsert(
    instance: CommonAdministrativeAreaLevel1Model,
    options,
  ): void {
    SequelizeAuditingAgent.registerSideEffect(
      instance,
      options,
      AuditingSideEffectEvent.UPSERTED,
      '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
      'CommonAdministrativeAreaLevel1Model',
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

  @ForeignKey(() => CommonCountryModel)
  @Column({
    field: 'countryId',
    allowNull: false,
    type: DataTypes.UUID,
  })
  countryId: string;

  @BelongsTo(() => CommonCountryModel, {
    constraints: false,
    foreignKey: 'countryId',
  })
  country: CommonCountryModel;

  @Column({
    field: 'code',
    allowNull: false,
    type: DataTypes.STRING(8),
  })
  code: string;

  @Column({
    field: 'customCode',
    allowNull: true,
    type: DataTypes.STRING(64),
  })
  customCode: string;

  @Column({
    field: 'name',
    allowNull: false,
    type: DataTypes.STRING(128),
  })
  name: string;

  @Column({
    field: 'slug',
    allowNull: false,
    type: DataTypes.STRING(128),
  })
  slug: string;

  @Column({
    field: 'latitude',
    allowNull: true,
    type: DataTypes.DECIMAL(16, 14),
  })
  latitude: number;

  @Column({
    field: 'longitude',
    allowNull: true,
    type: DataTypes.DECIMAL(17, 14),
  })
  longitude: number;

  @Column({
    field: 'zoom',
    allowNull: true,
    type: DataTypes.SMALLINT,
  })
  zoom: number;

  @Column({
    field: 'mapType',
    allowNull: true,
    type: DataTypes.ENUM('ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'),
  })
  mapType: string;

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
