import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIUserRepository } from '../../domain/iam-user.repository';
import { IamUser } from '../../domain/iam-user.aggregate';

@Injectable()
export class IamGetUsersService
{
    constructor(
        private readonly repository: IamIUserRepository,
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
