/* eslint-disable indent */
/* eslint-disable key-spacing */
import { OAuthClientModel } from '@app/o-auth/client';
import { OAuthRefreshTokenModel } from '@app/o-auth/refresh-token';
import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  modelName: 'OAuthAccessToken',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['rowId'],
      unique: true,
    },
    {
      fields: ['clientId'],
      unique: false,
    },
  ],
})
export class OAuthAccessTokenModel extends Model<OAuthAccessTokenModel> {
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

  @ForeignKey(() => OAuthClientModel)
  @Column({
    field: 'clientId',
    allowNull: false,
    type: DataTypes.UUID,
  })
  clientId: string;

  @BelongsTo(() => OAuthClientModel, {
    constraints: false,
    foreignKey: 'clientId',
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
    type: DataTypes.STRING(128),
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
