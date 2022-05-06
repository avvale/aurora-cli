import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindTenantByIdQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant-by-id.query';
import { DeleteTenantByIdCommand } from '../../../../@apps/iam/tenant/application/delete/delete-tenant-by-id.command';
import { IamTenant } from '../../../../graphql';
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
    ): Promise<IamTenant | IamTenantDto>
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantByIdCommand(id, constraint, { timezone }));

        return tenant;
    }
}