import { IamIUserRepository, IamUser, IamUserMapper, IamUserModel } from '@app/iam/user';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeUserRepository extends SequelizeRepository<IamUser, IamUserModel> implements IamIUserRepository
{
    public readonly aggregateName: string = 'IamUser';
    public readonly mapper: IamUserMapper = new IamUserMapper();

    constructor(
        @InjectModel(IamUserModel)
        public readonly repository: typeof IamUserModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
