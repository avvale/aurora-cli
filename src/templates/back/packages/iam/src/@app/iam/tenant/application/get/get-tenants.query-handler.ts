import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TenantResponse } from '../../domain/tenant.response';
import { TenantMapper } from '../../domain/tenant.mapper';
import { GetTenantsQuery } from './get-tenants.query';
import { GetTenantsService } from './get-tenants.service';

@QueryHandler(GetTenantsQuery)
export class GetTenantsQueryHandler implements IQueryHandler<GetTenantsQuery>
{
    private readonly mapper: TenantMapper = new TenantMapper();

    constructor(
        private readonly getTenantsService: GetTenantsService,
    ) {}

    async execute(query: GetTenantsQuery): Promise<TenantResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getTenantsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}