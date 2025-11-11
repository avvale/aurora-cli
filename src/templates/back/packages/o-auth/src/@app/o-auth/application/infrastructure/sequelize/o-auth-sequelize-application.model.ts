/* eslint-disable indent */
/* eslint-disable key-spacing */
import { OAuthApplicationClientModel } from '@app/o-auth/application-client';
import { OAuthClientModel } from '@app/o-auth/client';
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
    BelongsToMany,
    Column,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    modelName: 'OAuthApplication',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['rowId'],
            unique: true,
        },
        {
            fields: ['code'],
            unique: true,
        },
    ],
})
export class OAuthApplicationModel extends Model<OAuthApplicationModel> {
    @AfterCreate
    static auditingCreate(instance: OAuthApplicationModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: OAuthApplicationModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: OAuthApplicationModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: OAuthApplicationModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: OAuthApplicationModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: OAuthApplicationModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/o-auth/application/infrastructure/sequelize/o-auth-sequelize-application.model',
            'OAuthApplicationModel',
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
        field: 'code',
        allowNull: false,
        type: DataTypes.STRING(64),
    })
    code: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(128),
    })
    name: string;

    @Column({
        field: 'secret',
        allowNull: false,
        type: DataTypes.STRING(128),
    })
    secret: string;

    @Column({
        field: 'isMaster',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isMaster: boolean;

    @BelongsToMany(() => OAuthClientModel, {
        through: () => OAuthApplicationClientModel,
        uniqueKey: 'Uq01OAuthApplicationClient',
        constraints: false,
    })
    clients: OAuthClientModel[];

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
