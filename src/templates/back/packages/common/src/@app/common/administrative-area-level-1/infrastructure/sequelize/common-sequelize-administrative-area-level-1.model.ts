/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CommonCountryModel } from '@app/common/country';

@Table({
    modelName: 'CommonAdministrativeAreaLevel1',
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
export class CommonAdministrativeAreaLevel1Model extends Model<CommonAdministrativeAreaLevel1Model>
{
    @AfterCreate
    static auditingCreate(instance: CommonAdministrativeAreaLevel1Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
            'CommonAdministrativeAreaLevel1Model',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: CommonAdministrativeAreaLevel1Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
            'CommonAdministrativeAreaLevel1Model',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: CommonAdministrativeAreaLevel1Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
            'CommonAdministrativeAreaLevel1Model',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
            'CommonAdministrativeAreaLevel1Model',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: CommonAdministrativeAreaLevel1Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
            'CommonAdministrativeAreaLevel1Model',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
            'CommonAdministrativeAreaLevel1Model',
        );
    }

    @AfterRestore
    static auditingRestore(instance: CommonAdministrativeAreaLevel1Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
            'CommonAdministrativeAreaLevel1Model',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/common/administrative-area-level-1/infrastructure/sequelize/common-sequelize-administrative-area-level-1.model',
            'CommonAdministrativeAreaLevel1Model',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: CommonAdministrativeAreaLevel1Model, options): void
    {
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
