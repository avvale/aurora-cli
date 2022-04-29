import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindTenantByIdQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant-by-id.query';
import { UpdateTenantCommand } from '../../../../@apps/iam/tenant/application/update/update-tenant.command';
import { IamTenant, IamUpdateTenantInput } from '../../../../graphql';
import { IamTenantDto, IamUpdateTenantDto } from '../dto';

@Injectable()
export class IamUpdateTenantHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantInput | IamUpdateTenantDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new UpdateTenantCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, constraint, { timezone }));
    }
}