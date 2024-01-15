/* eslint-disable indent */
/* eslint-disable key-spacing */
import { CommonCountryModel } from '@app/common/country';
import { CommonLangModel } from '@app/common/lang';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'CommonCountryI18n',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['countryId', 'langId'],
			unique: true,
			name: 'uniqueCountryIdLangId',
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
export class CommonCountryI18nModel extends Model<CommonCountryI18nModel>
{
    @AfterCreate
    static auditingCreate(instance: CommonCountryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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
            '@app/common/country/infrastructure/sequelize/common-sequelize-country.model',
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

    @ForeignKey(() => CommonCountryModel)
    @Column({
        field: 'countryId',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    countryId: string;

    @BelongsTo(() => CommonCountryModel)
    country: CommonCountryModel;

    @ForeignKey(() => CommonLangModel)
    @Column({
        field: 'langId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    langId: string;

    @BelongsTo(() => CommonLangModel, {
        constraints: false,
        foreignKey: 'langId',
    })
    lang: CommonLangModel;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(127),
    })
    name: string;

    @Column({
        field: 'slug',
        allowNull: false,
        type: DataTypes.STRING(127),
    })
    slug: string;

    @Column({
        field: 'administrativeAreaLevel1',
        allowNull: true,
        type: DataTypes.STRING(63),
    })
    administrativeAreaLevel1: string;

    @Column({
        field: 'administrativeAreaLevel2',
        allowNull: true,
        type: DataTypes.STRING(63),
    })
    administrativeAreaLevel2: string;

    @Column({
        field: 'administrativeAreaLevel3',
        allowNull: true,
        type: DataTypes.STRING(63),
    })
    administrativeAreaLevel3: string;

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
