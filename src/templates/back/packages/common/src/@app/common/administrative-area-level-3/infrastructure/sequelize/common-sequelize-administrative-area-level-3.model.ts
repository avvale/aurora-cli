/* eslint-disable indent */
/* eslint-disable key-spacing */
import { CommonAdministrativeAreaLevel1Model } from '@app/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Model } from '@app/common/administrative-area-level-2';
import { CommonCountryModel } from '@app/common/country';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'CommonAdministrativeAreaLevel3',
    freezeTableName: true,
    timestamps: false,
    indexes: [
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
export class CommonAdministrativeAreaLevel3Model extends Model<CommonAdministrativeAreaLevel3Model>
{
    @AfterCreate
    static auditingCreate(instance: CommonAdministrativeAreaLevel3Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: CommonAdministrativeAreaLevel3Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: CommonAdministrativeAreaLevel3Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: CommonAdministrativeAreaLevel3Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @AfterRestore
    static auditingRestore(instance: CommonAdministrativeAreaLevel3Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: CommonAdministrativeAreaLevel3Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/common/administrative-area-level-3/infrastructure/sequelize/common-sequelize-administrative-area-level-3.model',
            'CommonAdministrativeAreaLevel3Model',
        );
    }

    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

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

    @ForeignKey(() => CommonAdministrativeAreaLevel1Model)
    @Column({
        field: 'administrativeAreaLevel1Id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    administrativeAreaLevel1Id: string;

    @BelongsTo(() => CommonAdministrativeAreaLevel1Model, {
        constraints: false,
        foreignKey: 'administrativeAreaLevel1Id',
    })
    administrativeAreaLevel1: CommonAdministrativeAreaLevel1Model;

    @ForeignKey(() => CommonAdministrativeAreaLevel2Model)
    @Column({
        field: 'administrativeAreaLevel2Id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    administrativeAreaLevel2Id: string;

    @BelongsTo(() => CommonAdministrativeAreaLevel2Model, {
        constraints: false,
        foreignKey: 'administrativeAreaLevel2Id',
    })
    administrativeAreaLevel2: CommonAdministrativeAreaLevel2Model;

    @Column({
        field: 'code',
        allowNull: false,
        type: DataTypes.STRING(8),
    })
    code: string;

    @Column({
        field: 'customCode',
        allowNull: true,
        type: DataTypes.STRING(10),
    })
    customCode: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(100),
    })
    name: string;

    @Column({
        field: 'slug',
        allowNull: false,
        type: DataTypes.STRING(100),
    })
    slug: string;

    @Column({
        field: 'latitude',
        allowNull: true,
        type: DataTypes.DECIMAL(16,14),
    })
    latitude: number;

    @Column({
        field: 'longitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,14),
    })
    longitude: number;

    @Column({
        field: 'zoom',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    zoom: number;

    @Column({
        field: 'mapType',
        allowNull: false,
        type: DataTypes.ENUM('ROADMAP','SATELLITE','HYBRID','TERRAIN'),
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
