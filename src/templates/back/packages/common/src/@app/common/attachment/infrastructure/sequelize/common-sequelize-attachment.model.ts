/* eslint-disable indent */
/* eslint-disable key-spacing */
import { CommonAttachmentFamilyModel } from '@app/common/attachment-family';
import { CommonAttachmentLibraryModel } from '@app/common/attachment-library';
import { CommonLangModel } from '@app/common/lang';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'CommonAttachment',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['attachableId'],
			unique: false,
		},

    ],
})
export class CommonAttachmentModel extends Model<CommonAttachmentModel>
{
    @AfterCreate
    static auditingCreate(instance: CommonAttachmentModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: CommonAttachmentModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: CommonAttachmentModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: CommonAttachmentModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: CommonAttachmentModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: CommonAttachmentModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/common/attachment/infrastructure/sequelize/common-sequelize-attachment.model',
            'CommonAttachmentModel',
        );
    }

    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => CommonAttachmentFamilyModel)
    @Column({
        field: 'familyId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    familyId: string;

    @BelongsTo(() => CommonAttachmentFamilyModel, {
        constraints: false,
        foreignKey: 'familyId',
    })
    family: CommonAttachmentFamilyModel;

    @Column({
        field: 'attachableId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    attachableId: string;

    @ForeignKey(() => CommonLangModel)
    @Column({
        field: 'langId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    langId: string;

    @BelongsTo(() => CommonLangModel, {
        constraints: false,
        foreignKey: 'langId',
    })
    lang: CommonLangModel;

    @Column({
        field: 'sort',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    sort: number;

    @Column({
        field: 'alt',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    alt: string;

    @Column({
        field: 'title',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    title: string;

    @Column({
        field: 'originFilename',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    originFilename: string;

    @Column({
        field: 'filename',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    filename: string;

    @Column({
        field: 'mimetype',
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    mimetype: string;

    @Column({
        field: 'extension',
        allowNull: false,
        type: DataTypes.STRING(10),
    })
    extension: string;

    @Column({
        field: 'relativePathSegments',
        allowNull: false,
        type: DataTypes.JSON,
    })
    relativePathSegments: any;

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
        field: 'size',
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    size: number;

    @Column({
        field: 'url',
        allowNull: false,
        type: DataTypes.STRING(2047),
    })
    url: string;

    @Column({
        field: 'isCropable',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isCropable: boolean;

    @ForeignKey(() => CommonAttachmentLibraryModel)
    @Column({
        field: 'libraryId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    libraryId: string;

    @BelongsTo(() => CommonAttachmentLibraryModel, {
        constraints: false,
        foreignKey: 'libraryId',
    })
    library: CommonAttachmentLibraryModel;

    @Column({
        field: 'libraryFilename',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    libraryFilename: string;

    @Column({
        field: 'sizes',
        allowNull: true,
        type: DataTypes.JSON,
    })
    sizes: any;

    @Column({
        field: 'meta',
        allowNull: true,
        type: DataTypes.JSON,
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
