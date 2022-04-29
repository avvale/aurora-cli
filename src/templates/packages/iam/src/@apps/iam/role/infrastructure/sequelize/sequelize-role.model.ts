/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamPermissionModel } from '../../../../../@apps/iam/permission/infrastructure/sequelize/sequelize-permission.model';
import { IamPermissionsRolesModel } from '../../../../../@apps/iam/permission/infrastructure/sequelize/sequelize-permissions-roles.model';
import { IamAccountModel } from '../../../../../@apps/iam/account/infrastructure/sequelize/sequelize-account.model';
import { IamRolesAccountsModel } from '../../../../../@apps/iam/role/infrastructure/sequelize/sequelize-roles-accounts.model';

@Table({ modelName: 'IamRole', freezeTableName: true, timestamps: false })
export class IamRoleModel extends Model<IamRoleModel>
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
        field: 'isMaster',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isMaster: boolean;


    @BelongsToMany(() => IamPermissionModel, {
        through: () => IamPermissionsRolesModel,
        uniqueKey: 'Uq01IamPermissionsRoles',
    })
    permissions: IamPermissionModel[];


    @BelongsToMany(() => IamAccountModel, {
        through: () => IamRolesAccountsModel,
        uniqueKey: 'Uq01IamRolesAccounts',
    })
    accounts: IamAccountModel[];

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