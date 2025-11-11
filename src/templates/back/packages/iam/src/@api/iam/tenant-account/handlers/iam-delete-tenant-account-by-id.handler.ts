import { IamTenantAccount } from '@api/graphql';
import { IamTenantAccountDto } from '@api/iam/tenant-account';
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
import { Injectable } from '@nestjs/common';

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
    ): Promise<IamTenantAccount | IamTenantAccountDto> {
        const tenantAccount = await this.queryBus.ask(
            new IamFindTenantAccountByIdQuery(tenantId, accountId, constraint, {
                timezone,
            }),
        );

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
