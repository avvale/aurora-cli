import { IamTenant } from '@api/graphql';
import { IamTenantDto } from '@api/iam/tenant';
import { IamFindTenantQuery } from '@app/iam/tenant';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTenantHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenant | IamTenantDto> {
        return await this.queryBus.ask(
            new IamFindTenantQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
