import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IAccountRepository } from '../../domain/account.repository';
import { IamAccount } from '../../domain/account.aggregate';

@Injectable()
export class FindAccountService
{
    constructor(
        private readonly repository: IAccountRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamAccount>
    {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}