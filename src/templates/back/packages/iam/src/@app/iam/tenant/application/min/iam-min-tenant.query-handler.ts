import { IamMinTenantQuery } from '@app/iam/tenant';
import { IamMinTenantService } from '@app/iam/tenant/application/min/iam-min-tenant.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinTenantQuery)
export class IamMinTenantQueryHandler implements IQueryHandler<IamMinTenantQuery>
{
    constructor(
        private readonly minTenantService: IamMinTenantService,
    ) {}

    async execute(query: IamMinTenantQuery): Promise<number>
    {
        return await this.minTenantService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
