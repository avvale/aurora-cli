import { IamITenantAccountRepository, IamTenantAccount, IamTenantAccountMapper, IamTenantAccountModel } from '@app/iam/tenant-account';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeTenantAccountRepository extends SequelizeRepository<IamTenantAccount, IamTenantAccountModel> implements IamITenantAccountRepository
{
    public readonly aggregateName: string = 'IamTenantAccount';
    public readonly mapper: IamTenantAccountMapper = new IamTenantAccountMapper();

    constructor(
        @InjectModel(IamTenantAccountModel)
        public readonly repository: typeof IamTenantAccountModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
