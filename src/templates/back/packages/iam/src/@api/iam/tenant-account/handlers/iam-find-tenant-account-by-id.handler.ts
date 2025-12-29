import { IamTenantAccount } from '@api/graphql';
import { IamFindTenantAccountByIdQuery } from '@app/iam/tenant-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindTenantAccountByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        tenantId: string,
        accountId: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenantAccount> {
        const tenantAccount = await this.queryBus.ask(
            new IamFindTenantAccountByIdQuery(tenantId, accountId, constraint, {
                timezone,
            }),
        );

        if (!tenantAccount) {
            throw new NotFoundException(
                `IamTenantAccount with tenantId: ${tenantId}, accountId: ${accountId}, not found`,
            );
        }

        return tenantAccount;
    }
}
