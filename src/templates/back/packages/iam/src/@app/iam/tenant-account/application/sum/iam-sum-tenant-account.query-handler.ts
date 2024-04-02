import { IamSumTenantAccountQuery } from '@app/iam/tenant-account';
import { IamSumTenantAccountService } from '@app/iam/tenant-account/application/sum/iam-sum-tenant-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumTenantAccountQuery)
export class IamSumTenantAccountQueryHandler implements IQueryHandler<IamSumTenantAccountQuery>
{
    constructor(
        private readonly sumTenantAccountService: IamSumTenantAccountService,
    ) {}

    async execute(query: IamSumTenantAccountQuery): Promise<number>
    {
        return await this.sumTenantAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
