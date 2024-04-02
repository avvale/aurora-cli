import { IamCountTenantQuery } from '@app/iam/tenant';
import { IamCountTenantService } from '@app/iam/tenant/application/count/iam-count-tenant.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountTenantQuery)
export class IamCountTenantQueryHandler implements IQueryHandler<IamCountTenantQuery>
{
    constructor(
        private readonly countTenantService: IamCountTenantService,
    ) {}

    async execute(query: IamCountTenantQuery): Promise<number>
    {
        return await this.countTenantService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
