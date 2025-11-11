import {
    IamFindTenantQuery,
    IamTenantMapper,
    IamTenantResponse,
} from '@app/iam/tenant';
import { IamFindTenantService } from '@app/iam/tenant/application/find/iam-find-tenant.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindTenantQuery)
export class IamFindTenantQueryHandler
    implements IQueryHandler<IamFindTenantQuery>
{
    private readonly mapper: IamTenantMapper = new IamTenantMapper();

    constructor(private readonly findTenantService: IamFindTenantService) {}

    async execute(query: IamFindTenantQuery): Promise<IamTenantResponse> {
        const tenant = await this.findTenantService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(tenant);
    }
}
