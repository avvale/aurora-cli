import { IamCountTenantAccountQuery } from '@app/iam/tenant-account';
import { IamCountTenantAccountService } from '@app/iam/tenant-account/application/count/iam-count-tenant-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountTenantAccountQuery)
export class IamCountTenantAccountQueryHandler implements IQueryHandler<IamCountTenantAccountQuery>
{
    constructor(
        private readonly countTenantAccountService: IamCountTenantAccountService,
    ) {}

    async execute(query: IamCountTenantAccountQuery): Promise<number>
    {
        return await this.countTenantAccountService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
