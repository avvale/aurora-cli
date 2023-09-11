import { IamTenantAccount } from '@api/graphql';
import { IamTenantAccountDto } from '@api/iam/tenant-account';
import { IamFindTenantAccountByIdQuery } from '@app/iam/tenant-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTenantAccountByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        tenantId: string,
        accountId: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenantAccount | IamTenantAccountDto>
    {
        return await this.queryBus.ask(new IamFindTenantAccountByIdQuery(
            tenantId,
            accountId,
            constraint,
            {
                timezone,
            },
        ));
    }
}
