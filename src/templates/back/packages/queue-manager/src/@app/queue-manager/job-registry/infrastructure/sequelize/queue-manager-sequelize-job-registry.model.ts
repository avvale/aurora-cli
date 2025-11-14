/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'QueueManagerJobRegistry',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['rowId'],
            unique: true,
        },
        {
            fields: ['state'],
            unique: false,
        },
        {
            fields: ['jobId'],
            unique: false,
        },
        {
            fields: ['tags'],
            unique: false,
        },
    ],
})
export class QueueManagerJobRegistryModel extends Model<QueueManagerJobRegistryModel> {
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
        field: 'queueName',
        allowNull: false,
        type: DataTypes.STRING(63),
    })
    queueName: string;

    @Column({
        field: 'state',
        allowNull: false,
        type: DataTypes.ENUM(
            'COMPLETED',
            'WAITING',
            'ACTIVE',
            'DELAYED',
            'FAILED',
            'PAUSED',
        ),
        defaultValue: 'WAITING',
    })
    state: string;

    @Column({
        field: 'jobId',
        allowNull: false,
        type: DataTypes.STRING(36),
    })
    jobId: string;

    @Column({
        field: 'jobName',
        allowNull: true,
        type: DataTypes.STRING(63),
        defaultValue: '__default__',
    })
    jobName: string;

    @Column({
        field: 'tags',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING(63)),
    })
    tags: string[];

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
