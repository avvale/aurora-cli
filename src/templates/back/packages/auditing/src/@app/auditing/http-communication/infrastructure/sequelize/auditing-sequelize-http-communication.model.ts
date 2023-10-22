/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
    modelName: 'AuditingHttpCommunication',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['tags'],
			unique: false,
		},
		{
			fields: ['reprocessingHttpCommunicationId'],
			unique: false,
		},
		{
			fields: ['createdAt'],
			unique: false,
		},

    ],
})
export class AuditingHttpCommunicationModel extends Model<AuditingHttpCommunicationModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'tags',
        allowNull: true,
        type: DataTypes.JSON,
    })
    tags: any;

    @Column({
        field: 'event',
        allowNull: false,
        type: DataTypes.ENUM('REQUEST_FULFILLED','REQUEST_REJECTED','RESPONSE_FULFILLED','RESPONSE_REJECTED'),
    })
    event: string;

    @Column({
        field: 'status',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    status: number;

    @Column({
        field: 'method',
        allowNull: false,
        type: DataTypes.STRING(25),
    })
    method: string;

    @Column({
        field: 'url',
        allowNull: false,
        type: DataTypes.STRING(2048),
    })
    url: string;

    @Column({
        field: 'httpRequest',
        allowNull: true,
        type: DataTypes.JSON,
    })
    httpRequest: any;

    @Column({
        field: 'httpRequestRejected',
        allowNull: true,
        type: DataTypes.JSON,
    })
    httpRequestRejected: any;

    @Column({
        field: 'httpResponse',
        allowNull: true,
        type: DataTypes.JSON,
    })
    httpResponse: any;

    @Column({
        field: 'httpResponseRejected',
        allowNull: true,
        type: DataTypes.JSON,
    })
    httpResponseRejected: any;

    @Column({
        field: 'isReprocessing',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isReprocessing: boolean;

    @Column({
        field: 'reprocessingHttpCommunicationId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    reprocessingHttpCommunicationId: string;

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
