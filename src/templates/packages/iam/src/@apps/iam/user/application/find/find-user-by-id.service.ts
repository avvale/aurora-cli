import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IUserRepository } from '../../domain/user.repository';
import { IamUser } from '../../domain/user.aggregate';
import { UserId } from '../../domain/value-objects';

@Injectable()
export class FindUserByIdService
{
    constructor(
        private readonly repository: IUserRepository,
    ) {}

    async main(id: UserId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamUser>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}