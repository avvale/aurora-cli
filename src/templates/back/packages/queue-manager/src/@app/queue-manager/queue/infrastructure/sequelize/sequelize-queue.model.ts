/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
    modelName: 'QueueManagerQueue',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['prefix'],
            unique: true,
        },
        {
            fields: ['name'],
            unique: true,
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
        type: DataTypes.STRING(50),
    })
    prefix: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(50),
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