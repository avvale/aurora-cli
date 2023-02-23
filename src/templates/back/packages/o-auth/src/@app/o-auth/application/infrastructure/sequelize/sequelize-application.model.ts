/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthClientModel } from '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model';
import { OAuthApplicationsClientsModel } from '@app/o-auth/application/infrastructure/sequelize/sequelize-applications-clients.model';

// auditing
import { SequelizeAuditingAgent } from '@app/auditing/side-effect/infrastructure/sequelize/sequelize-auditing-agent';
import { AuditingSideEffectEvent } from '@api/graphql';

@Table({
    modelName: 'OAuthApplication',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['code'],
            unique: true,
        },
    ],
})
export class OAuthApplicationModel extends Model<OAuthApplicationModel>
{
    @AfterCreate
    static auditingCreate(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
            'OAuthApplicationModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: OAuthApplicationModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model',
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
        field: 'code',
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    code: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'secret',
        allowNull: false,
        type: DataTypes.STRING(90),
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
        through: () => OAuthApplicationsClientsModel,
        uniqueKey: 'Uq01OAuthApplicationsClients',
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