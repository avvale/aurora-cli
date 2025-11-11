import { IamTenant } from '@api/graphql';
import { IamTenantDto } from '@api/iam/tenant';
import { IamDeleteTenantsCommand, IamGetTenantsQuery } from '@app/iam/tenant';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteTenantsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenant[] | IamTenantDto[]> {
        const tenants = await this.queryBus.ask(
            new IamGetTenantsQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new IamDeleteTenantsCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return tenants;
    }
}
