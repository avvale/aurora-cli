/* eslint-disable indent */
/* eslint-disable key-spacing */
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
    Column,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    modelName: 'IamTag',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['rowId'],
            unique: true,
        },
    ],
})
export class IamTagModel extends Model<IamTagModel> {
    @AfterCreate
    static auditingCreate(instance: IamTagModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamTagModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamTagModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamTagModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamTagModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamTagModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/tag/infrastructure/sequelize/iam-sequelize-tag.model',
            'IamTagModel',
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
        type: DataTypes.STRING(64),
    })
    name: string;

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
