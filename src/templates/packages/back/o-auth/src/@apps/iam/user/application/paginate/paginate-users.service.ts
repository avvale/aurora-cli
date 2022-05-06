import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IUserRepository } from '../../domain/user.repository';
import { IamUser } from '../../domain/user.aggregate';

@Injectable()
export class PaginateUsersService
{
    constructor(
        private readonly repository: IUserRepository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<IamUser>>
    {
        return await this.repository.paginate({ queryStatement, constraint, cQMetadata });
    }
}