import {
    IamTenantAccount,
    IamUpdateTenantAccountByIdInput,
} from '@api/graphql';
import {
    IamTenantAccountDto,
    IamUpdateTenantAccountByIdDto,
} from '@api/iam/tenant-account';
import {
    IamFindTenantAccountByIdQuery,
    IamUpdateTenantAccountByIdCommand,
} from '@app/iam/tenant-account';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateTenantAccountByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload:
            | IamUpdateTenantAccountByIdInput
            | IamUpdateTenantAccountByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenantAccount | IamTenantAccountDto> {
        const tenantAccount = await this.queryBus.ask(
            new IamFindTenantAccountByIdQuery(
                payload.tenantId,
                payload.accountId,
                constraint,
                {
                    timezone,
                },
            ),
        );

        const dataToUpdate = diff(payload, tenantAccount);

        await this.commandBus.dispatch(
            new IamUpdateTenantAccountByIdCommand(
                {
                    ...dataToUpdate,
                    tenantId: payload.tenantId,
                    accountId: payload.accountId,
                },
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
            new IamFindTenantAccountByIdQuery(
                payload.tenantId,
                payload.accountId,
                constraint,
                {
                    timezone,
                },
            ),
        );
    }
}
