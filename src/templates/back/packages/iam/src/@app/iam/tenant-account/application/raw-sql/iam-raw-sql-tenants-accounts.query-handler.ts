import { IamRawSQLTenantsAccountsQuery, IamTenantAccountMapper, IamTenantAccountResponse } from '@app/iam/tenant-account';
import { IamRawSQLTenantsAccountsService } from '@app/iam/tenant-account/application/raw-sql/iam-raw-sql-tenants-accounts.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLTenantsAccountsQuery)
export class IamRawSQLTenantsAccountsQueryHandler implements IQueryHandler<IamRawSQLTenantsAccountsQuery>
{
    private readonly mapper: IamTenantAccountMapper = new IamTenantAccountMapper();

    constructor(
        private readonly rawSQLTenantsAccountsService: IamRawSQLTenantsAccountsService,
    ) {}

    async execute(query: IamRawSQLTenantsAccountsQuery): Promise<IamTenantAccountResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLTenantsAccountsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
