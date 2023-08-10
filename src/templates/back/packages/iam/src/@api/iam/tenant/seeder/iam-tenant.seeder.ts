import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreateTenantsCommand } from '@app/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';

@Injectable()
export class IamTenantSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreateTenantsCommand(
            iamMockTenantData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
