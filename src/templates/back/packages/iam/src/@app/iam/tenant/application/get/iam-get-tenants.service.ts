import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamITenantRepository } from '../../domain/iam-tenant.repository';
import { IamTenant } from '../../domain/iam-tenant.aggregate';

@Injectable()
export class IamGetTenantsService
{
    constructor(
        private readonly repository: IamITenantRepository,
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
