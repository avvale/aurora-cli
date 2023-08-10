import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamITenantRepository } from '../../domain/iam-tenant.repository';
import { IamTenant } from '../../domain/iam-tenant.aggregate';

@Injectable()
export class IamPaginateTenantsService
{
    constructor(
        private readonly repository: IamITenantRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<IamTenant>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
