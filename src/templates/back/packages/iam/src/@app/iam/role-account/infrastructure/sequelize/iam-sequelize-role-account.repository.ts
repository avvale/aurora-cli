import { IamIRoleAccountRepository, IamRoleAccount, IamRoleAccountMapper, IamRoleAccountModel } from '@app/iam/role-account';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeRoleAccountRepository extends SequelizeRepository<IamRoleAccount, IamRoleAccountModel> implements IamIRoleAccountRepository
{
    public readonly aggregateName: string = 'IamRoleAccount';
    public readonly mapper: IamRoleAccountMapper = new IamRoleAccountMapper();

    constructor(
        @InjectModel(IamRoleAccountModel)
        public readonly repository: typeof IamRoleAccountModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
