import { IamMaxTenantQuery } from '@app/iam/tenant';
import { IamMaxTenantService } from '@app/iam/tenant/application/max/iam-max-tenant.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxTenantQuery)
export class IamMaxTenantQueryHandler implements IQueryHandler<IamMaxTenantQuery>
{
    constructor(
        private readonly maxTenantService: IamMaxTenantService,
    ) {}

    async execute(query: IamMaxTenantQuery): Promise<number>
    {
        return await this.maxTenantService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
