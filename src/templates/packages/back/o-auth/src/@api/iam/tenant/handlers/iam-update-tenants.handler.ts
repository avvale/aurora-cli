import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetTenantsQuery } from '@apps/iam/tenant/application/get/get-tenants.query';
import { UpdateTenantsCommand } from '@apps/iam/tenant/application/update/update-tenants.command';
import { IamTenant, IamUpdateTenantsInput } from '../../../../graphql';
import { IamTenantDto, IamUpdateTenantsDto } from '../dto';

@Injectable()
export class IamUpdateTenantsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantsInput | IamUpdateTenantsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new UpdateTenantsCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));
    }
}