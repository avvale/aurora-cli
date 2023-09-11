/* eslint-disable indent */
/* eslint-disable key-spacing */
import { OAuthAccessTokenModel } from '@app/o-auth/access-token';
import { DataTypes } from 'sequelize';
import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'OAuthRefreshToken',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['accessTokenId'],
			unique: false,
		},

    ],
})
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
    @Column({
        field: 'accessTokenId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    accessTokenId: string;

    @BelongsTo(() => OAuthAccessTokenModel, {
        constraints: false,
        foreignKey: 'accessTokenId',
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
        defaultValue: false,
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
