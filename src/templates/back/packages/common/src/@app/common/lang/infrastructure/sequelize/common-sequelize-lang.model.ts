/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
    modelName: 'CommonLang',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['iso6392'],
			unique: false,
		},
		{
			fields: ['iso6393'],
			unique: false,
		},
		{
			fields: ['ietf'],
			unique: false,
		},
		{
			fields: ['customCode'],
			unique: false,
		},

    ],
})
export class CommonLangModel extends Model<CommonLangModel>
{
    @AfterCreate
    static auditingCreate(instance: CommonLangModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: CommonLangModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: CommonLangModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: CommonLangModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: CommonLangModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: CommonLangModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/common/lang/infrastructure/sequelize/common-sequelize-lang.model',
            'CommonLangModel',
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
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(undefined),
    })
    name: string;

    @Column({
        field: 'image',
        allowNull: true,
        type: DataTypes.STRING(undefined),
    })
    image: string;

    @Column({
        field: 'iso6392',
        allowNull: false,
        type: DataTypes.CHAR(2),
    })
    iso6392: string;

    @Column({
        field: 'iso6393',
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso6393: string;

    @Column({
        field: 'ietf',
        allowNull: false,
        type: DataTypes.CHAR(5),
    })
    ietf: string;

    @Column({
        field: 'customCode',
        allowNull: true,
        type: DataTypes.STRING(10),
    })
    customCode: string;

    @Column({
        field: 'dir',
        allowNull: false,
        type: DataTypes.ENUM('LTR','RTL'),
    })
    dir: string;

    @Column({
        field: 'sort',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    sort: number;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isActive: boolean;

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