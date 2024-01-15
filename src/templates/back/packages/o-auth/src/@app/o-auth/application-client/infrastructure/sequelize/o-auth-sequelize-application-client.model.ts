/* eslint-disable indent */
/* eslint-disable key-spacing */
import { OAuthApplicationModel } from '@app/o-auth/application';
import { OAuthClientModel } from '@app/o-auth/client';
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'OAuthApplicationClient',
    freezeTableName: true,
    timestamps: false,
})
export class OAuthApplicationClientModel extends Model<OAuthApplicationClientModel>
{
    @AfterCreate
    static auditingCreate(instance: OAuthApplicationClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: OAuthApplicationClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: OAuthApplicationClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: OAuthApplicationClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: OAuthApplicationClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: OAuthApplicationClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/o-auth/application-client/infrastructure/sequelize/o-auth-sequelize-application-client.model',
            'OAuthApplicationClientModel',
        );
    }

    @ForeignKey(() => OAuthApplicationModel)
    @Column({
        field: 'applicationId',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    applicationId: string;

    @BelongsTo(() => OAuthApplicationModel, {
        constraints: false,
        foreignKey: 'applicationId',
    })
    application: OAuthApplicationModel;

    @ForeignKey(() => OAuthClientModel)
    @Column({
        field: 'clientId',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    clientId: string;

    @BelongsTo(() => OAuthClientModel, {
        constraints: false,
        foreignKey: 'clientId',
    })
    client: OAuthClientModel;

}
