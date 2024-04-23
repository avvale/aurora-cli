import { IamIRoleAccountRepository } from '@app/iam/role-account';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMinRoleAccountService
{
    constructor(
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    async main(
        column: string,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.min(
            column,
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
