import { IamSumTenantQuery } from '@app/iam/tenant';
import { IamSumTenantService } from '@app/iam/tenant/application/sum/iam-sum-tenant.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumTenantQuery)
export class IamSumTenantQueryHandler implements IQueryHandler<IamSumTenantQuery>
{
    constructor(
        private readonly sumTenantService: IamSumTenantService,
    ) {}

    async execute(query: IamSumTenantQuery): Promise<number>
    {
        return await this.sumTenantService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
