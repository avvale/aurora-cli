/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthAccessTokenModel } from '@app/o-auth/access-token/infrastructure/sequelize/sequelize-access-token.model';
import { OAuthApplicationModel } from '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model';
import { OAuthApplicationsClientsModel } from '@app/o-auth/application/infrastructure/sequelize/sequelize-applications-clients.model';

// auditing
import { SequelizeAuditingAgent } from '@app/auditing/side-effect/infrastructure/sequelize/sequelize-auditing-agent';
import { AuditingSideEffectEvent } from '@api/graphql';

@Table({
    modelName: 'OAuthClient',
    freezeTableName: true,
    timestamps: false,
})
export class OAuthClientModel extends Model<OAuthClientModel>
{
    @AfterCreate
    static auditingCreate(instance: OAuthClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: OAuthClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: OAuthClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: OAuthClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: OAuthClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: OAuthClientModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model',
            'OAuthClientModel',
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
        field: 'grantType',
        allowNull: false,
        type: DataTypes.ENUM('AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD','REFRESH_TOKEN'),
    })
    grantType: string;

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
        field: 'authUrl',
        allowNull: true,
        type: DataTypes.STRING(2048),
    })
    authUrl: string;

    @Column({
        field: 'redirect',
        allowNull: true,
        type: DataTypes.STRING(2048),
    })
    redirect: string;

    @Column({
        field: 'scopeOptions',
        allowNull: true,
        type: DataTypes.JSON,
    })
    scopeOptions: any;

    @Column({
        field: 'expiredAccessToken',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    expiredAccessToken: number;

    @Column({
        field: 'expiredRefreshToken',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    expiredRefreshToken: number;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isActive: boolean;

    @Column({
        field: 'isMaster',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isMaster: boolean;


    @BelongsToMany(() => OAuthApplicationModel, {
        through: () => OAuthApplicationsClientsModel,
        uniqueKey: 'Uq01OAuthApplicationsClients',
        constraints: false,
    })
    applications: OAuthApplicationModel[];


    @HasMany(() => OAuthAccessTokenModel, {
        constraints: false,
    })
    accessTokens: OAuthAccessTokenModel[];

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