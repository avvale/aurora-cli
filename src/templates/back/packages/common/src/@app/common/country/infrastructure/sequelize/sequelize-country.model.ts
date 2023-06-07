/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CommonLangModel } from '@app/common/lang/infrastructure/sequelize/sequelize-lang.model';
import { CommonCountryI18nModel } from './sequelize-country-i18n.model';

@Table({
    modelName: 'CommonCountry',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['iso3166Alpha2'],
			unique: false,
		},
		{
			fields: ['iso3166Alpha3'],
			unique: false,
		},
		{
			fields: ['iso3166Numeric'],
			unique: false,
		},
		{
			fields: ['customCode'],
			unique: false,
		},

    ],
})
export class CommonCountryModel extends Model<CommonCountryModel>
{
    @AfterCreate
    static auditingCreate(instance: CommonCountryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: CommonCountryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: CommonCountryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: CommonCountryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: CommonCountryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: CommonCountryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/common/country/infrastructure/sequelize/sequelize-country.model',
            'CommonCountryModel',
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
        field: 'iso3166Alpha2',
        allowNull: false,
        type: DataTypes.CHAR(2),
    })
    iso3166Alpha2: string;

    @Column({
        field: 'iso3166Alpha3',
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso3166Alpha3: string;

    @Column({
        field: 'iso3166Numeric',
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso3166Numeric: string;

    @Column({
        field: 'customCode',
        allowNull: true,
        type: DataTypes.STRING(10),
    })
    customCode: string;

    @Column({
        field: 'prefix',
        allowNull: true,
        type: DataTypes.STRING(5),
    })
    prefix: string;

    @Column({
        field: 'image',
        allowNull: true,
        type: DataTypes.STRING(1024),
    })
    image: string;

    @Column({
        field: 'sort',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    sort: number;

    @Column({
        field: 'administrativeAreas',
        allowNull: true,
        type: DataTypes.JSON,
    })
    administrativeAreas: any;

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
        field: 'availableLangs',
        allowNull: true,
        type: DataTypes.JSON,
    })
    availableLangs: any;

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

    // i18n relation
    @HasOne(() => CommonCountryI18nModel, { as: 'countryI18n' })
    countryI18n: CommonCountryI18nModel;
}