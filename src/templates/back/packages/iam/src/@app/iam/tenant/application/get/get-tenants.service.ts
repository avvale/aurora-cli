import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { ITenantRepository } from '../../domain/tenant.repository';
import { IamTenant } from '../../domain/tenant.aggregate';

@Injectable()
export class GetTenantsService
{
    constructor(
        private readonly repository: ITenantRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamTenant[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}