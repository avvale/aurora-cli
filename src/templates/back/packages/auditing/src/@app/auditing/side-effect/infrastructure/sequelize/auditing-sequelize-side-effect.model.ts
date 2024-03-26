/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'AuditingSideEffect',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['tags'],
			unique: false,
		},
		{
			fields: ['operationId'],
			unique: false,
		},
		{
			fields: ['accountId'],
			unique: false,
		},
		{
			fields: ['rollbackSideEffectId'],
			unique: false,
		},
		{
			fields: ['createdAt'],
			unique: false,
		},
    ],
})
export class AuditingSideEffectModel extends Model<AuditingSideEffectModel>
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
        type: DataTypes.ARRAY(DataTypes.STRING()),
    })
    tags: string[];

    @Column({
        field: 'modelPath',
        allowNull: false,
        type: DataTypes.STRING(1022),
    })
    modelPath: string;

    @Column({
        field: 'modelName',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    modelName: string;

    @Column({
        field: 'operationId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    operationId: string;

    @Column({
        field: 'operationSort',
        allowNull: true,
        type: DataTypes.SMALLINT,
    })
    operationSort: number;

    @Column({
        field: 'accountId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    accountId: string;

    @Column({
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING(127),
    })
    email: string;

    @Column({
        field: 'event',
        allowNull: false,
        type: DataTypes.ENUM('CREATED','BULK_CREATED','UPDATED','BULK_UPDATED','DELETED','BULK_DELETED','RESTORED','BULK_RESTORED','UPSERTED'),
    })
    event: string;

    @Column({
        field: 'auditableId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    auditableId: string;

    @Column({
        field: 'oldValue',
        allowNull: true,
        type: DataTypes.JSONB,
    })
    oldValue: any;

    @Column({
        field: 'newValue',
        allowNull: true,
        type: DataTypes.JSONB,
    })
    newValue: any;

    @Column({
        field: 'ip',
        allowNull: true,
        type: DataTypes.STRING(19),
    })
    ip: string;

    @Column({
        field: 'method',
        allowNull: true,
        type: DataTypes.ENUM('GET','POST','UPDATE','DELETE'),
    })
    method: string;

    @Column({
        field: 'baseUrl',
        allowNull: true,
        type: DataTypes.STRING(2046),
    })
    baseUrl: string;

    @Column({
        field: 'params',
        allowNull: true,
        type: DataTypes.JSONB,
    })
    params: any;

    @Column({
        field: 'query',
        allowNull: true,
        type: DataTypes.JSONB,
    })
    query: any;

    @Column({
        field: 'body',
        allowNull: true,
        type: DataTypes.JSONB,
    })
    body: any;

    @Column({
        field: 'userAgent',
        allowNull: true,
        type: DataTypes.STRING(1022),
    })
    userAgent: string;

    @Column({
        field: 'isRollback',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isRollback: boolean;

    @Column({
        field: 'rollbackSideEffectId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    rollbackSideEffectId: string;

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
