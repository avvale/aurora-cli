import { IamIAccountRepository } from '@app/iam/account';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamSumAccountService
{
    constructor(
        private readonly repository: IamIAccountRepository,
    ) {}

    async main(
        column: string,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.sum(
            column,
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
