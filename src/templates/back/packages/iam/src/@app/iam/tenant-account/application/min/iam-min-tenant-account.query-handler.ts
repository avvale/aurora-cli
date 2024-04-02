import { IamMinTenantAccountQuery } from '@app/iam/tenant-account';
import { IamMinTenantAccountService } from '@app/iam/tenant-account/application/min/iam-min-tenant-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinTenantAccountQuery)
export class IamMinTenantAccountQueryHandler implements IQueryHandler<IamMinTenantAccountQuery>
{
    constructor(
        private readonly minTenantAccountService: IamMinTenantAccountService,
    ) {}

    async execute(query: IamMinTenantAccountQuery): Promise<number>
    {
        return await this.minTenantAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
