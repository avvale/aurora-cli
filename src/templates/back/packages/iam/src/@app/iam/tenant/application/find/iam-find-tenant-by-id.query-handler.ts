import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamTenantResponse } from '../../domain/iam-tenant.response';
import { IamTenantMapper } from '../../domain/iam-tenant.mapper';
import { IamTenantId } from '../../domain/value-objects';
import { IamFindTenantByIdQuery } from './iam-find-tenant-by-id.query';
import { IamFindTenantByIdService } from './iam-find-tenant-by-id.service';

@QueryHandler(IamFindTenantByIdQuery)
export class IamFindTenantByIdQueryHandler implements IQueryHandler<IamFindTenantByIdQuery>
{
    private readonly mapper: IamTenantMapper = new IamTenantMapper();

    constructor(
        private readonly findTenantByIdService: IamFindTenantByIdService,
    ) {}

    async execute(query: IamFindTenantByIdQuery): Promise<IamTenantResponse>
    {
        const tenant = await this.findTenantByIdService.main(
            new IamTenantId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(tenant);
    }
}
