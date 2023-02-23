/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
    modelName: 'AuditingSideEffect',
    freezeTableName: true,
    timestamps: false,
    indexes: [
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
        type: DataTypes.JSON,
    })
    tags: any;

    @Column({
        field: 'modelPath',
        allowNull: false,
        type: DataTypes.STRING(1023),
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
        type: DataTypes.TINYINT.UNSIGNED,
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
        type: DataTypes.STRING(120),
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
        type: DataTypes.JSON,
    })
    oldValue: any;

    @Column({
        field: 'newValue',
        allowNull: true,
        type: DataTypes.JSON,
    })
    newValue: any;

    @Column({
        field: 'ip',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    ip: string;

    @Column({
        field: 'method',
        allowNull: false,
        type: DataTypes.ENUM('GET','POST','UPDATE','DELETE'),
    })
    method: string;

    @Column({
        field: 'baseUrl',
        allowNull: true,
        type: DataTypes.STRING(2047),
    })
    baseUrl: string;

    @Column({
        field: 'params',
        allowNull: true,
        type: DataTypes.JSON,
    })
    params: any;

    @Column({
        field: 'query',
        allowNull: true,
        type: DataTypes.JSON,
    })
    query: any;

    @Column({
        field: 'body',
        allowNull: true,
        type: DataTypes.JSON,
    })
    body: any;

    @Column({
        field: 'userAgent',
        allowNull: true,
        type: DataTypes.STRING(1023),
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