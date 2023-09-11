import { IamTenantAccount, IamUpdateTenantAccountByIdInput } from '@api/graphql';
import { IamTenantAccountDto, IamUpdateTenantAccountByIdDto } from '@api/iam/tenant-account';
import { IamFindTenantAccountByIdQuery, IamUpsertTenantAccountCommand } from '@app/iam/tenant-account';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpsertTenantAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantAccountByIdInput | IamUpdateTenantAccountByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenantAccount | IamTenantAccountDto>
    {
        await this.commandBus.dispatch(new IamUpsertTenantAccountCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindTenantAccountByIdQuery(
            payload.tenantId,
            payload.accountId,
            {},
            {
                timezone,
            },
        ));
    }
}
