import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamTenantResponse } from '../../domain/iam-tenant.response';
import { IamTenantMapper } from '../../domain/iam-tenant.mapper';
import { IamFindTenantQuery } from './iam-find-tenant.query';
import { IamFindTenantService } from './iam-find-tenant.service';

@QueryHandler(IamFindTenantQuery)
export class IamFindTenantQueryHandler implements IQueryHandler<IamFindTenantQuery>
{
    private readonly mapper: IamTenantMapper = new IamTenantMapper();

    constructor(
        private readonly findTenantService: IamFindTenantService,
    ) {}

    async execute(query: IamFindTenantQuery): Promise<IamTenantResponse>
    {
        const tenant = await this.findTenantService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(tenant);
    }
}
