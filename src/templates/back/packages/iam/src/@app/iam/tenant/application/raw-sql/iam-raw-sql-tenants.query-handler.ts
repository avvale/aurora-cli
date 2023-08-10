import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamTenantResponse } from '../../domain/iam-tenant.response';
import { IamTenantMapper } from '../../domain/iam-tenant.mapper';
import { IamRawSQLTenantsQuery } from './iam-raw-sql-tenants.query';
import { IamRawSQLTenantsService } from './iam-raw-sql-tenants.service';

@QueryHandler(IamRawSQLTenantsQuery)
export class IamRawSQLTenantsQueryHandler implements IQueryHandler<IamRawSQLTenantsQuery>
{
    private readonly mapper: IamTenantMapper = new IamTenantMapper();

    constructor(
        private readonly rawSQLTenantsService: IamRawSQLTenantsService,
    ) {}

    async execute(query: IamRawSQLTenantsQuery): Promise<IamTenantResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLTenantsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
