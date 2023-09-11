import { IamTenantAccount } from '@api/graphql';
import { IamTenantAccountDto } from '@api/iam/tenant-account';
import { IamGetTenantsAccountsQuery } from '@app/iam/tenant-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamGetTenantsAccountsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenantAccount[] | IamTenantAccountDto[]>
    {
        return await this.queryBus.ask(new IamGetTenantsAccountsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
