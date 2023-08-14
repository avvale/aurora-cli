import { IamTenant, IamUpdateTenantsInput } from '@api/graphql';
import { IamTenantDto, IamUpdateTenantsDto } from '@api/iam/tenant';
import { IamGetTenantsQuery, IamUpdateTenantsCommand } from '@app/iam/tenant';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        auditing?: AuditingMeta,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new IamUpdateTenantsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamGetTenantsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
