import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TenantResponse } from '../../domain/tenant.response';
import { TenantMapper } from '../../domain/tenant.mapper';
import { FindTenantQuery } from './find-tenant.query';
import { FindTenantService } from './find-tenant.service';

@QueryHandler(FindTenantQuery)
export class FindTenantQueryHandler implements IQueryHandler<FindTenantQuery>
{
    private readonly mapper: TenantMapper = new TenantMapper();

    constructor(
        private readonly findTenantService: FindTenantService,
    ) {}

    async execute(query: FindTenantQuery): Promise<TenantResponse>
    {
        const tenant = await this.findTenantService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(tenant);
    }
}