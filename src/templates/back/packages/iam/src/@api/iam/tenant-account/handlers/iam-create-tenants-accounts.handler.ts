import { IamCreateTenantAccountInput } from '@api/graphql';
import { IamCreateTenantAccountDto } from '@api/iam/tenant-account';
import { IamCreateTenantsAccountsCommand } from '@app/iam/tenant-account';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateTenantsAccountsHandler {
    constructor(private readonly commandBus: ICommandBus) {}

    async main(
        payload: IamCreateTenantAccountInput[] | IamCreateTenantAccountDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        await this.commandBus.dispatch(
            new IamCreateTenantsAccountsCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return true;
    }
}
