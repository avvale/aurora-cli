import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IUserRepository } from '../../domain/user.repository';
import { IamUser } from '../../domain/user.aggregate';

@Injectable()
export class GetUsersService
{
    constructor(
        private readonly repository: IUserRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamUser[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}