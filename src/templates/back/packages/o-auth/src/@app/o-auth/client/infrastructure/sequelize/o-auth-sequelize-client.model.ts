/* eslint-disable indent */
/* eslint-disable key-spacing */
import { OAuthAccessTokenModel } from '@app/o-auth/access-token';
import { OAuthApplicationModel } from '@app/o-auth/application';
import { OAuthApplicationClientModel } from '@app/o-auth/application-client';
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
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    modelName: 'OAuthClient',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['rowId'],
            unique: true,
        },
    ],
})
export class OAuthClientModel extends Model<OAuthClientModel> {
    @AfterCreate
    static auditingCreate(instance: OAuthClientModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: OAuthClientModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: OAuthClientModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: OAuthClientModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: OAuthClientModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
            'OAuthClientModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: OAuthClientModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/o-auth/client/infrastructure/sequelize/o-auth-sequelize-client.model',
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
        field: 'rowId',
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.BIGINT,
    })
    rowId: number;

    @Column({
        field: 'grantType',
        allowNull: false,
        type: DataTypes.ENUM(
            'AUTHORIZATION_CODE',
            'CLIENT_CREDENTIALS',
            'PASSWORD',
            'REFRESH_TOKEN',
        ),
    })
    grantType: string;

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
        field: 'authUrl',
        allowNull: true,
        type: DataTypes.STRING(2046),
    })
    authUrl: string;

    @Column({
        field: 'redirect',
        allowNull: true,
        type: DataTypes.STRING(2046),
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
        type: DataTypes.INTEGER,
    })
    expiredAccessToken: number;

    @Column({
        field: 'expiredRefreshToken',
        allowNull: true,
        type: DataTypes.INTEGER,
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
        through: () => OAuthApplicationClientModel,
        uniqueKey: 'Uq01OAuthApplicationClient',
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
