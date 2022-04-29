/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamUserModel } from '../../../../../@apps/iam/user/infrastructure/sequelize/sequelize-user.model';
import { IamRoleModel } from '../../../../../@apps/iam/role/infrastructure/sequelize/sequelize-role.model';
import { IamRolesAccountsModel } from '../../../../../@apps/iam/role/infrastructure/sequelize/sequelize-roles-accounts.model';
import { IamTenantModel } from '../../../../../@apps/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { IamTenantsAccountsModel } from '../../../../../@apps/iam/tenant/infrastructure/sequelize/sequelize-tenants-accounts.model';

@Table({ modelName: 'IamAccount', freezeTableName: true, timestamps: false })
export class IamAccountModel extends Model<IamAccountModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'type',
        allowNull: false,
        type: DataTypes.ENUM('USER','SERVICE'),
    })
    type: string;

    @Unique
    @Column({
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING(120),
    })
    email: string;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isActive: boolean;

    @Index
    @Column({
        field: 'clientId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    clientId: string;

    @Column({
        field: 'dApplicationCodes',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dApplicationCodes: any;

    @Column({
        field: 'dPermissions',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dPermissions: any;

    @Column({
        field: 'dTenants',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dTenants: any;

    @Column({
        field: 'data',
        allowNull: true,
        type: DataTypes.JSON,
    })
    data: any;


    @BelongsToMany(() => IamRoleModel, {
        through: () => IamRolesAccountsModel,
        uniqueKey: 'Uq01IamRolesAccounts',
    })
    roles: IamRoleModel[];


    @BelongsToMany(() => IamTenantModel, {
        through: () => IamTenantsAccountsModel,
        uniqueKey: 'Uq01IamTenantsAccounts',
    })
    tenants: IamTenantModel[];


    @HasOne(() => IamUserModel)
    user: IamUserModel;

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