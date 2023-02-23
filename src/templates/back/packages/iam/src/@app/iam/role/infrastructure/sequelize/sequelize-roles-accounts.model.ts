/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamRoleModel } from '@app/iam/role/infrastructure/sequelize/sequelize-role.model';
import { IamAccountModel } from '@app/iam/account/infrastructure/sequelize/sequelize-account.model';

@Table({
    modelName: 'IamRolesAccounts',
    freezeTableName: true,
    timestamps: false
})
export class IamRolesAccountsModel extends Model<IamRolesAccountsModel>
{
    @ForeignKey(() => IamRoleModel)
    @Column({
        field: 'roleId',
        type: DataTypes.UUID,
    })
    roleId: string;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'accountId',
        type: DataTypes.UUID,
    })
    accountId: string;
}