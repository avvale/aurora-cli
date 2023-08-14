/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CommonResourceModel } from '@app/common/resource';

@Table({
    modelName: 'CommonAttachmentFamily',
    freezeTableName: true,
    timestamps: false,
})
export class CommonAttachmentFamilyModel extends Model<CommonAttachmentFamilyModel>
{
    @AfterCreate
    static auditingCreate(instance: CommonAttachmentFamilyModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: CommonAttachmentFamilyModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: CommonAttachmentFamilyModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: CommonAttachmentFamilyModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: CommonAttachmentFamilyModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: CommonAttachmentFamilyModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/common/attachment-family/infrastructure/sequelize/common-sequelize-attachment-family.model',
            'CommonAttachmentFamilyModel',
        );
    }

    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => CommonResourceModel)
    @Column({
        field: 'resourceId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    resourceId: string;

    @BelongsTo(() => CommonResourceModel, {
        constraints: false,
        foreignKey: 'resourceId',
    })
    resource: CommonResourceModel;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(100),
    })
    name: string;

    @Column({
        field: 'width',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    width: number;

    @Column({
        field: 'height',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    height: number;

    @Column({
        field: 'fitType',
        allowNull: true,
        type: DataTypes.ENUM('FIT_CROP','FIT_WIDTH','FIT_HEIGHT','FIT_WIDTH_FREE_CROP','FIT_HEIGHT_FREE_CROP'),
    })
    fitType: string;

    @Column({
        field: 'quality',
        allowNull: true,
        type: DataTypes.TINYINT.UNSIGNED,
    })
    quality: number;

    @Column({
        field: 'sizes',
        allowNull: true,
        type: DataTypes.JSON,
    })
    sizes: any;

    @Column({
        field: 'format',
        allowNull: true,
        type: DataTypes.ENUM('JPG','PNG','GIF','TIF','BMP'),
    })
    format: string;

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
