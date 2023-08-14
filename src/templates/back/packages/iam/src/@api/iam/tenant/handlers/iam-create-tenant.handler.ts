import { IamCreateTenantInput, IamTenant } from '@api/graphql';
import { IamCreateTenantDto, IamTenantDto } from '@api/iam/tenant';
import { IamCreateTenantCommand, IamFindTenantByIdQuery } from '@app/iam/tenant';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateTenantHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreateTenantInput | IamCreateTenantDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new IamCreateTenantCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindTenantByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
