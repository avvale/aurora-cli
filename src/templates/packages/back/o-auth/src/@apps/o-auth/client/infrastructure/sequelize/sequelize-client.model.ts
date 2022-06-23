/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthAccessTokenModel } from '@apps/o-auth/access-token/infrastructure/sequelize/sequelize-access-token.model';
import { OAuthApplicationModel } from '@apps/o-auth/application/infrastructure/sequelize/sequelize-application.model';
import { OAuthApplicationsClientsModel } from '@apps/o-auth/application/infrastructure/sequelize/sequelize-applications-clients.model';

@Table({ modelName: 'OAuthClient', freezeTableName: true, timestamps: false })
export class OAuthClientModel extends Model<OAuthClientModel>
{
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
        field: 'scopes',
        allowNull: true,
        type: DataTypes.JSON,
    })
    scopes: any;

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