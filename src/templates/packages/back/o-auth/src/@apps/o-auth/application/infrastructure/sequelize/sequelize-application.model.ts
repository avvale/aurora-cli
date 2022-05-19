/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthClientModel } from '@apps/o-auth/client/infrastructure/sequelize/sequelize-client.model';
import { OAuthApplicationsClientsModel } from '@apps/o-auth/application/infrastructure/sequelize/sequelize-applications-clients.model';

@Table({ modelName: 'OAuthApplication', freezeTableName: true, timestamps: false })
export class OAuthApplicationModel extends Model<OAuthApplicationModel>
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
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'code',
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    code: string;

    @Column({
        field: 'secret',
        allowNull: false,
        type: DataTypes.STRING(90),
    })
    secret: string;

    @Column({
        field: 'isMaster',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isMaster: boolean;


    @BelongsToMany(() => OAuthClientModel, {
        through: () => OAuthApplicationsClientsModel,
        uniqueKey: 'Uq01OAuthApplicationsClients',
        constraints: false,
    })
    clients: OAuthClientModel[];

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