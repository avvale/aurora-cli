import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IRoleAccountRepository } from '../../domain/role-account.repository';
import { IamRoleAccount } from '../../domain/role-account.aggregate';
import { RoleAccountMapper } from '../../domain/role-account.mapper';
import { IamRolesAccountsModel } from './sequelize-roles-accounts.model';

@Injectable()
export class SequelizeRoleAccountRepository extends SequelizeRepository<IamRoleAccount, IamRolesAccountsModel> implements IRoleAccountRepository
{
    public readonly aggregateName: string = 'IamPermissionsRoles';
    public readonly mapper: RoleAccountMapper = new RoleAccountMapper();

    constructor(
        @InjectModel(IamRolesAccountsModel)
        public readonly repository: typeof IamRolesAccountsModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}