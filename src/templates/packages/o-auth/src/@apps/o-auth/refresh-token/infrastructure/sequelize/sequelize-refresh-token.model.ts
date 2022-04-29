/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthAccessTokenModel } from '../../../../../@apps/o-auth/access-token/infrastructure/sequelize/sequelize-access-token.model';

@Table({ modelName: 'OAuthRefreshToken', freezeTableName: true, timestamps: false })
export class OAuthRefreshTokenModel extends Model<OAuthRefreshTokenModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => OAuthAccessTokenModel)
    @Index
    @Column({
        field: 'accessTokenId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    accessTokenId: string;

    @BelongsTo(() => OAuthAccessTokenModel, {
        constraints: false,
    })
    accessToken: OAuthAccessTokenModel;

    @Column({
        field: 'token',
        allowNull: false,
        type: DataTypes.TEXT,
    })
    token: string;

    @Column({
        field: 'isRevoked',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isRevoked: boolean;

    @Column({
        field: 'expiresAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    expiresAt: string;

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