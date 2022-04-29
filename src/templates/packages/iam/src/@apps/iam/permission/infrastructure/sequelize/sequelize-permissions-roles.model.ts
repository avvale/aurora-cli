import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamPermissionModel } from '../../../../../@apps/iam/permission/infrastructure/sequelize/sequelize-permission.model';
import { IamRoleModel } from '../../../../../@apps/iam/role/infrastructure/sequelize/sequelize-role.model';

@Table({ modelName: 'IamPermissionsRoles', freezeTableName: true, timestamps: false })
export class IamPermissionsRolesModel extends Model<IamPermissionsRolesModel>
{
    @ForeignKey(() => IamPermissionModel)
    @Column({
        field: 'permissionId',
        type: DataTypes.UUID,
    })
    permissionId: string;

    @ForeignKey(() => IamRoleModel)
    @Column({
        field: 'roleId',
        type: DataTypes.UUID,
    })
    roleId: string;
}