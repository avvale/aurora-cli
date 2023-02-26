import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TenantResponse } from '../../domain/tenant.response';
import { TenantMapper } from '../../domain/tenant.mapper';
import { RawSQLTenantsQuery } from './raw-sql-tenants.query';
import { RawSQLTenantsService } from './raw-sql-tenants.service';

@QueryHandler(RawSQLTenantsQuery)
export class RawSQLTenantsQueryHandler implements IQueryHandler<RawSQLTenantsQuery>
{
    private readonly mapper: TenantMapper = new TenantMapper();

    constructor(
        private readonly rawSQLTenantsService: RawSQLTenantsService,
    ) {}

    async execute(query: RawSQLTenantsQuery): Promise<TenantResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLTenantsService.main(query.rawSQL, query.cQMetadata));
    }
}