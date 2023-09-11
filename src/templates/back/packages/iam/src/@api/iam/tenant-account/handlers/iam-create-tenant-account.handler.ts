import { IamCreateTenantAccountInput, IamTenantAccount } from '@api/graphql';
import { IamCreateTenantAccountDto, IamTenantAccountDto } from '@api/iam/tenant-account';
import { IamCreateTenantAccountCommand, IamFindTenantAccountByIdQuery } from '@app/iam/tenant-account';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateTenantAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreateTenantAccountInput | IamCreateTenantAccountDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenantAccount | IamTenantAccountDto>
    {
        await this.commandBus.dispatch(new IamCreateTenantAccountCommand(
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
