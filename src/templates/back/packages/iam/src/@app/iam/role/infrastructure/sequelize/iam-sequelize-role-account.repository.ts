import { IamIRoleAccountRepository, IamRoleAccount, IamRoleAccountMapper, IamRolesAccountsModel } from '@app/iam/role';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeRoleAccountRepository extends SequelizeRepository<IamRoleAccount, IamRolesAccountsModel> implements IamIRoleAccountRepository
{
    public readonly aggregateName: string = 'IamPermissionsRoles';
    public readonly mapper: IamRoleAccountMapper = new IamRoleAccountMapper();

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