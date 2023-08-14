import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamAccount } from '../../domain/iam-account.aggregate';

@Injectable()
export class IamGetAccountsService
{
    constructor(
        private readonly repository: IamIAccountRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamAccount[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
