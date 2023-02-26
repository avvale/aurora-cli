import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetTenantsQuery } from '@app/iam/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '@app/iam/tenant/application/delete/delete-tenants.command';
import { IamTenant } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<IamTenant[] | IamTenantDto[]>
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantsCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return tenants;
    }
}