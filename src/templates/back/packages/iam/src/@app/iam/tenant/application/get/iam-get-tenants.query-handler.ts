import { IamGetTenantsQuery, IamTenantMapper, IamTenantResponse } from '@app/iam/tenant';
import { IamGetTenantsService } from '@app/iam/tenant/application/get/iam-get-tenants.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetTenantsQuery)
export class IamGetTenantsQueryHandler implements IQueryHandler<IamGetTenantsQuery>
{
    private readonly mapper: IamTenantMapper = new IamTenantMapper();

    constructor(
        private readonly getTenantsService: IamGetTenantsService,
    ) {}

    async execute(query: IamGetTenantsQuery): Promise<IamTenantResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getTenantsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
