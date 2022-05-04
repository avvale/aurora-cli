import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TenantResponse } from '../../domain/tenant.response';
import { TenantMapper } from '../../domain/tenant.mapper';
import { TenantId } from '../../domain/value-objects';
import { FindTenantByIdQuery } from './find-tenant-by-id.query';
import { FindTenantByIdService } from './find-tenant-by-id.service';

@QueryHandler(FindTenantByIdQuery)
export class FindTenantByIdQueryHandler implements IQueryHandler<FindTenantByIdQuery>
{
    private readonly mapper: TenantMapper = new TenantMapper();

    constructor(
        private readonly findTenantByIdService: FindTenantByIdService,
    ) {}

    async execute(query: FindTenantByIdQuery): Promise<TenantResponse>
    {
        const tenant = await this.findTenantByIdService.main(
            new TenantId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(tenant);
    }
}