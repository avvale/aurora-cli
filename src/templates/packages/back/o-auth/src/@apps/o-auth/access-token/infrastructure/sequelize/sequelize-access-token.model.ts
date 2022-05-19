/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthRefreshTokenModel } from '@apps/o-auth/refresh-token/infrastructure/sequelize/sequelize-refresh-token.model';
import { OAuthClientModel } from '@apps/o-auth/client/infrastructure/sequelize/sequelize-client.model';

@Table({ modelName: 'OAuthAccessToken', freezeTableName: true, timestamps: false })
export class OAuthAccessTokenModel extends Model<OAuthAccessTokenModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => OAuthClientModel)
    @Index
    @Column({
        field: 'clientId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    clientId: string;

    @BelongsTo(() => OAuthClientModel, {
        constraints: false,
    })
    client: OAuthClientModel;

    @Column({
        field: 'accountId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    accountId: string;

    @Column({
        field: 'token',
        allowNull: false,
        type: DataTypes.TEXT,
    })
    token: string;

    @Column({
        field: 'name',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'isRevoked',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isRevoked: boolean;

    @Column({
        field: 'expiresAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    expiresAt: string;


    @HasOne(() => OAuthRefreshTokenModel, {
        constraints: false,
    })
    refreshToken: OAuthRefreshTokenModel;

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