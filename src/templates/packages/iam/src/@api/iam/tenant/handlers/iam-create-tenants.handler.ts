import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateTenantsCommand } from '../../../../@apps/iam/tenant/application/create/create-tenants.command';
import { IamCreateTenantInput } from '../../../../graphql';
import { IamCreateTenantDto } from '../dto';

@Injectable()
export class IamCreateTenantsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreateTenantInput[] | IamCreateTenantDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(payload, { timezone }));
        return true;
    }
}