/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamAccountModel } from '../../../../../@apps/iam/account/infrastructure/sequelize/sequelize-account.model';
import { IamTenantsAccountsModel } from '../../../../../@apps/iam/tenant/infrastructure/sequelize/sequelize-tenants-accounts.model';

@Table({ modelName: 'IamTenant', freezeTableName: true, timestamps: false })
export class IamTenantModel extends Model<IamTenantModel>
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

    @Index
    @Column({
        field: 'code',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    code: string;

    @Column({
        field: 'logo',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    logo: string;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isActive: boolean;

    @Column({
        field: 'data',
        allowNull: true,
        type: DataTypes.JSON,
    })
    data: any;


    @BelongsToMany(() => IamAccountModel, {
        through: () => IamTenantsAccountsModel,
        uniqueKey: 'Uq01IamTenantsAccounts',
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