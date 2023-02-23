import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { CreateTenantsCommand } from '@app/iam/tenant/application/create/create-tenants.command';
import { IamCreateTenantInput } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));
        return true;
    }
}