import {
    IamRawSQLTenantsQuery,
    IamTenantMapper,
    IamTenantResponse,
} from '@app/iam/tenant';
import { IamRawSQLTenantsService } from '@app/iam/tenant/application/raw-sql/iam-raw-sql-tenants.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLTenantsQuery)
export class IamRawSQLTenantsQueryHandler
    implements IQueryHandler<IamRawSQLTenantsQuery>
{
    private readonly mapper: IamTenantMapper = new IamTenantMapper();

    constructor(
        private readonly rawSQLTenantsService: IamRawSQLTenantsService,
    ) {}

    async execute(query: IamRawSQLTenantsQuery): Promise<IamTenantResponse[]> {
        return this.mapper.mapAggregatesToResponses(
            await this.rawSQLTenantsService.main(
                query.rawSQL,
                query.cQMetadata,
            ),
        );
    }
}
