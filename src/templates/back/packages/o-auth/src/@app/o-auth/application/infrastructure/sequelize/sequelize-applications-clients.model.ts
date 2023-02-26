/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthApplicationModel } from '@app/o-auth/application/infrastructure/sequelize/sequelize-application.model';
import { OAuthClientModel } from '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model';

@Table({
    modelName: 'OAuthApplicationsClients',
    freezeTableName: true,
    timestamps: false,
})
export class OAuthApplicationsClientsModel extends Model<OAuthApplicationsClientsModel>
{
    @ForeignKey(() => OAuthApplicationModel)
    @Column({
        field: 'applicationId',
        type: DataTypes.UUID,
    })
    applicationId: string;

    @ForeignKey(() => OAuthClientModel)
    @Column({
        field: 'clientId',
        type: DataTypes.UUID,
    })
    clientId: string;
}