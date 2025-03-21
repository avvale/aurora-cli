import { IamIUserRepository } from '@app/iam/user';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamSumUserService
{
    constructor(
        private readonly repository: IamIUserRepository,
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
