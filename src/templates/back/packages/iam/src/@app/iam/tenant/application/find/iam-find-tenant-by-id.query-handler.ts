import {
    IamFindTenantByIdQuery,
    IamTenantMapper,
    IamTenantResponse,
} from '@app/iam/tenant';
import { IamFindTenantByIdService } from '@app/iam/tenant/application/find/iam-find-tenant-by-id.service';
import { IamTenantId } from '@app/iam/tenant/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindTenantByIdQuery)
export class IamFindTenantByIdQueryHandler
    implements IQueryHandler<IamFindTenantByIdQuery>
{
    private readonly mapper: IamTenantMapper = new IamTenantMapper();

    constructor(
        private readonly findTenantByIdService: IamFindTenantByIdService,
    ) {}

    async execute(query: IamFindTenantByIdQuery): Promise<IamTenantResponse> {
        const tenant = await this.findTenantByIdService.main(
            new IamTenantId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(tenant);
    }
}
