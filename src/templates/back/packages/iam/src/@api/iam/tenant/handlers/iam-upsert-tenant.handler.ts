import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';
import { IamTenantDto, IamUpdateTenantByIdDto } from '@api/iam/tenant';
import { IamFindTenantByIdQuery, IamUpsertTenantCommand } from '@app/iam/tenant';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpsertTenantHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantByIdInput | IamUpdateTenantByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new IamUpsertTenantCommand(
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
