import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetTenantsQuery } from '../../../../@apps/iam/tenant/application/get/get-tenants.query';
import { IamTenant } from '../../../../graphql';
import { IamTenantDto } from '../dto';

@Injectable()
export class IamGetTenantsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenant[] | IamTenantDto[]>
    {
        return await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));
    }
}