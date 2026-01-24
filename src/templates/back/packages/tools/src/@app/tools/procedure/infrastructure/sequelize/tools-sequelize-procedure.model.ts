/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'ToolsProcedure',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['rowId'],
      unique: true,
    },
    {
      fields: ['version'],
      unique: false,
    },
  ],
})
export class ToolsProcedureModel extends Model<ToolsProcedureModel> {
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
    field: 'name',
    allowNull: false,
    type: DataTypes.STRING(128),
  })
  name: string;

  @Column({
    field: 'type',
    allowNull: false,
    type: DataTypes.ENUM('FUNCTION', 'PROCEDURE', 'TRIGGER'),
  })
  type: string;

  @Column({
    field: 'version',
    allowNull: false,
    type: DataTypes.STRING(16),
  })
  version: string;

  @Column({
    field: 'isActive',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @Column({
    field: 'isExecuted',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  isExecuted: boolean;

  @Column({
    field: 'isUpdated',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  isUpdated: boolean;

  @Column({
    field: 'upScript',
    allowNull: true,
    type: DataTypes.TEXT,
  })
  upScript: string;

  @Column({
    field: 'downScript',
    allowNull: true,
    type: DataTypes.TEXT,
  })
  downScript: string;

  @Column({
    field: 'sort',
    allowNull: true,
    type: DataTypes.SMALLINT,
  })
  sort: number;

  @Column({
    field: 'hash',
    allowNull: true,
    type: DataTypes.STRING(64),
  })
  hash: string;

  @Column({
    field: 'executedAt',
    allowNull: true,
    type: DataTypes.DATE,
  })
  executedAt: string;

  @Column({
    field: 'checkedAt',
    allowNull: true,
    type: DataTypes.DATE,
  })
  checkedAt: string;

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
