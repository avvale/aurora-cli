import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from 'aurora-ts-core';
import { IUserRepository } from '../../domain/user.repository';
import { IamUser } from '../../domain/user.aggregate';
import { UserMapper } from '../../domain/user.mapper';
import { IamUserModel } from './sequelize-user.model';

@Injectable()
export class SequelizeUserRepository extends SequelizeRepository<IamUser, IamUserModel> implements IUserRepository
{
    public readonly aggregateName: string = 'IamUser';
    public readonly mapper: UserMapper = new UserMapper();

    constructor(
        @InjectModel(IamUserModel)
        public readonly repository: typeof IamUserModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}