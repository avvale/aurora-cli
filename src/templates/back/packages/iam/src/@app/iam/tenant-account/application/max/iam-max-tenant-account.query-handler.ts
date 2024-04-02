import { IamMaxTenantAccountQuery } from '@app/iam/tenant-account';
import { IamMaxTenantAccountService } from '@app/iam/tenant-account/application/max/iam-max-tenant-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxTenantAccountQuery)
export class IamMaxTenantAccountQueryHandler implements IQueryHandler<IamMaxTenantAccountQuery>
{
    constructor(
        private readonly maxTenantAccountService: IamMaxTenantAccountService,
    ) {}

    async execute(query: IamMaxTenantAccountQuery): Promise<number>
    {
        return await this.maxTenantAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
