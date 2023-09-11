import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreateTenantsAccountsCommand } from '@app/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';

@Injectable()
export class IamTenantAccountSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreateTenantsAccountsCommand(
            iamMockTenantAccountData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
