/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'ToolsWebhookLog',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['rowId'],
      unique: true,
    },
    {
      fields: ['createdAt'],
      unique: false,
    },
  ],
})
export class ToolsWebhookLogModel extends Model<ToolsWebhookLogModel> {
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
    field: 'url',
    allowNull: false,
    type: DataTypes.STRING(2046),
  })
  url: string;

  @Column({
    field: 'headerRequest',
    allowNull: true,
    type: DataTypes.JSONB,
  })
  headerRequest: any;

  @Column({
    field: 'bodyRequest',
    allowNull: true,
    type: DataTypes.JSONB,
  })
  bodyRequest: any;

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
