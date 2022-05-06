import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetTenantsQuery } from '../../../../@apps/iam/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '../../../../@apps/iam/tenant/application/delete/delete-tenants.command';
import { IamTenant } from '../../../../graphql';
import { IamTenantDto } from '../dto';

@Injectable()
export class IamDeleteTenantsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenant[] | IamTenantDto[]>
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatement, constraint, { timezone }));

        return tenants;
    }
}