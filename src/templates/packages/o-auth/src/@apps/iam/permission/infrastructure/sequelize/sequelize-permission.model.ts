/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamBoundedContextModel } from '../../../../../@apps/iam/bounded-context/infrastructure/sequelize/sequelize-bounded-context.model';
import { IamRoleModel } from '../../../../../@apps/iam/role/infrastructure/sequelize/sequelize-role.model';
import { IamPermissionsRolesModel } from '../../../../../@apps/iam/permission/infrastructure/sequelize/sequelize-permissions-roles.model';

@Table({ modelName: 'IamPermission', freezeTableName: true, timestamps: false })
export class IamPermissionModel extends Model<IamPermissionModel>
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

    @ForeignKey(() => IamBoundedContextModel)
    @Column({
        field: 'boundedContextId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    boundedContextId: string;

    @BelongsTo(() => IamBoundedContextModel, {
        constraints: false,
    })
    boundedContext: IamBoundedContextModel;


    @BelongsToMany(() => IamRoleModel, {
        through: () => IamPermissionsRolesModel,
        uniqueKey: 'Uq01IamPermissionsRoles',
    })
    roles: IamRoleModel[];

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