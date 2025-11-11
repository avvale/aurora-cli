/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamPermissionModel } from '@app/iam/permission';
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
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    modelName: 'IamBoundedContext',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['rowId'],
            unique: true,
        },
    ],
})
export class IamBoundedContextModel extends Model<IamBoundedContextModel> {
    @AfterCreate
    static auditingCreate(instance: IamBoundedContextModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamBoundedContextModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamBoundedContextModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamBoundedContextModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamBoundedContextModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamBoundedContextModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/bounded-context/infrastructure/sequelize/iam-sequelize-bounded-context.model',
            'IamBoundedContextModel',
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
        type: DataTypes.STRING(128),
    })
    name: string;

    @Column({
        field: 'root',
        allowNull: false,
        type: DataTypes.STRING(64),
    })
    root: string;

    @Column({
        field: 'sort',
        allowNull: true,
        type: DataTypes.SMALLINT,
    })
    sort: number;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isActive: boolean;

    @HasMany(() => IamPermissionModel, {
        constraints: false,
    })
    permissions: IamPermissionModel[];

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
