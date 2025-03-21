import { IamITenantAccountRepository } from '@app/iam/tenant-account';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMinTenantAccountService
{
    constructor(
        private readonly repository: IamITenantAccountRepository,
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
