/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'CommonAttachmentLibrary',
    freezeTableName: true,
    timestamps: false,
})
export class CommonAttachmentLibraryModel extends Model<CommonAttachmentLibraryModel>
{
    @AfterCreate
    static auditingCreate(instance: CommonAttachmentLibraryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: CommonAttachmentLibraryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: CommonAttachmentLibraryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: CommonAttachmentLibraryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: CommonAttachmentLibraryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: CommonAttachmentLibraryModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/common/attachment-library/infrastructure/sequelize/common-sequelize-attachment-library.model',
            'CommonAttachmentLibraryModel',
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
        type: DataTypes.STRING(63),
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
        allowNull: false,
        type: DataTypes.INTEGER,
    })
    width: number;

    @Column({
        field: 'height',
        allowNull: false,
        type: DataTypes.INTEGER,
    })
    height: number;

    @Column({
        field: 'size',
        allowNull: false,
        type: DataTypes.INTEGER,
    })
    size: number;

    @Column({
        field: 'url',
        allowNull: false,
        type: DataTypes.STRING(2047),
    })
    url: string;

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
