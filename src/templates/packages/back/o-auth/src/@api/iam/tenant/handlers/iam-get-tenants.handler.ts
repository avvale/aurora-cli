import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetTenantsQuery } from '@app/iam/tenant/application/get/get-tenants.query';
import { IamTenant } from '@api/graphql';
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