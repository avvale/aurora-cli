import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindTenantByIdQuery } from '@app/iam/tenant/application/find/find-tenant-by-id.query';
import { IamTenant } from '@api/graphql';
import { IamTenantDto } from '../dto';

@Injectable()
export class IamFindTenantByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTenant | IamTenantDto>
    {
        return await this.queryBus.ask(new FindTenantByIdQuery(id, constraint, { timezone }));
    }
}