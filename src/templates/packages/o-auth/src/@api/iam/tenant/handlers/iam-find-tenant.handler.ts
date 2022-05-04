import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindTenantQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant.query';
import { IamTenant } from '../../../../graphql';
import { IamTenantDto } from '../dto';

@Injectable()
export class IamFindTenantHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenant | IamTenantDto>
    {
        return await this.queryBus.ask(new FindTenantQuery(queryStatement, constraint, { timezone }));
    }
}