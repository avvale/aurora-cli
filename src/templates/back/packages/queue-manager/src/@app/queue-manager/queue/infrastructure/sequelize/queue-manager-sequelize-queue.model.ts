/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'QueueManagerQueue',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['rowId'],
            unique: true,
        },
        {
            fields: ['prefix', 'name'],
            unique: true,
        },
    ],
})
export class QueueManagerQueueModel extends Model<QueueManagerQueueModel> {
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
