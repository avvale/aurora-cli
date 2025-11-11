import { IamTenantAccount, IamUpdateTenantsAccountsInput } from '@api/graphql';
import {
    IamTenantAccountDto,
    IamUpdateTenantsAccountsDto,
} from '@api/iam/tenant-account';
import {
    IamGetTenantsAccountsQuery,
    IamUpdateTenantsAccountsCommand,
} from '@app/iam/tenant-account';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateTenantsAccountsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantsAccountsInput | IamUpdateTenantsAccountsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenantAccount | IamTenantAccountDto> {
        await this.commandBus.dispatch(
            new IamUpdateTenantsAccountsCommand(
                payload,
                queryStatement,
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return await this.queryBus.ask(
            new IamGetTenantsAccountsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
