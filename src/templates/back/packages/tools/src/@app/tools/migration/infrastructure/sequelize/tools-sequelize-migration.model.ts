/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'ToolsMigration',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['version'],
			unique: true,
		},
    ],
})
export class ToolsMigrationModel extends Model<ToolsMigrationModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(128),
    })
    name: string;

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
        field: 'executedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    executedAt: string;

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
