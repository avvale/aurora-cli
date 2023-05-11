import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateTenantsCommand } from '@app/iam/tenant/application/create/create-tenants.command';
import { tenants } from '@app/iam/tenant/infrastructure/mock/mock-tenant.data';

@Injectable()
export class IamTenantSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(
            tenants,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}