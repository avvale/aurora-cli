import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindTenantByIdQuery } from '@app/iam/tenant/application/find/find-tenant-by-id.query';
import { DeleteTenantByIdCommand } from '@app/iam/tenant/application/delete/delete-tenant-by-id.command';
import { IamTenant } from '@api/graphql';
import { IamTenantDto } from '../dto';

@Injectable()
export class IamDeleteTenantByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenant | IamTenantDto>
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return tenant;
    }
}