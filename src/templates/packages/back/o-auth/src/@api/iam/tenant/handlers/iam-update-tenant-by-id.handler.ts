import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindTenantByIdQuery } from '@apps/iam/tenant/application/find/find-tenant-by-id.query';
import { UpdateTenantByIdCommand } from '@apps/iam/tenant/application/update/update-tenant-by-id.command';
import { IamTenant, IamUpdateTenantByIdInput } from '../../../../graphql';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';

@Injectable()
export class IamUpdateTenantByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantByIdInput | IamUpdateTenantByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new UpdateTenantByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, constraint, { timezone }));
    }
}