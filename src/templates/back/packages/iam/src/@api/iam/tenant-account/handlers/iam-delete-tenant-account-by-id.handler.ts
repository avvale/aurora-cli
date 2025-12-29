import { IamTenantAccount } from '@api/graphql';
import {
    IamDeleteTenantAccountByIdCommand,
    IamFindTenantAccountByIdQuery,
} from '@app/iam/tenant-account';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamDeleteTenantAccountByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        tenantId: string,
        accountId: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenantAccount> {
        const tenantAccount = await this.queryBus.ask(
            new IamFindTenantAccountByIdQuery(tenantId, accountId, constraint, {
                timezone,
            }),
        );

        if (!tenantAccount) {
            throw new NotFoundException(
                `IamTenantAccount with tenantId: ${tenantId}, accountId: ${accountId}, not found`,
            );
        }

        await this.commandBus.dispatch(
            new IamDeleteTenantAccountByIdCommand(
                tenantId,
                accountId,
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return tenantAccount;
    }
}
