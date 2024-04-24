/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'QueueManagerQueue',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['prefix'],
			unique: true,
			name: 'uniquePrefixName',
		},
		{
			fields: ['name'],
			unique: true,
			name: 'uniquePrefixName',
		},
    ],
})
export class QueueManagerQueueModel extends Model<QueueManagerQueueModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'prefix',
        allowNull: false,
        type: DataTypes.STRING(63),
    })
    prefix: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(63),
    })
    name: string;

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
