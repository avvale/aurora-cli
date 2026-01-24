/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account/infrastructure/sequelize/iam-sequelize-account.model';
import { IamTenantModel } from '@app/iam/tenant/infrastructure/sequelize/iam-sequelize-tenant.model';
import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'IamTenantsAccounts',
  freezeTableName: true,
  timestamps: false,
})
export class IamTenantsAccountsModel extends Model<IamTenantsAccountsModel> {
  @ForeignKey(() => IamTenantModel)
  @Column({
    field: 'tenantId',
    type: DataTypes.UUID,
  })
  tenantId: string;

  @ForeignKey(() => IamAccountModel)
  @Column({
    field: 'accountId',
    type: DataTypes.UUID,
  })
  accountId: string;
}
