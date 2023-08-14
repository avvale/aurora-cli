import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamTenantResponse } from '../../domain/iam-tenant.response';
import { IamTenantMapper } from '../../domain/iam-tenant.mapper';
import { IamGetTenantsQuery } from './iam-get-tenants.query';
import { IamGetTenantsService } from './iam-get-tenants.service';

@QueryHandler(IamGetTenantsQuery)
export class IamGetTenantsQueryHandler implements IQueryHandler<IamGetTenantsQuery>
{
    private readonly mapper: IamTenantMapper = new IamTenantMapper();

    constructor(
        private readonly getTenantsService: IamGetTenantsService,
    ) {}

    async execute(query: IamGetTenantsQuery): Promise<IamTenantResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getTenantsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
