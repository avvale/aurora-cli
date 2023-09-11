import { IamRawSQLRolesAccountsQuery, IamRoleAccountMapper, IamRoleAccountResponse } from '@app/iam/role-account';
import { IamRawSQLRolesAccountsService } from '@app/iam/role-account/application/raw-sql/iam-raw-sql-roles-accounts.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLRolesAccountsQuery)
export class IamRawSQLRolesAccountsQueryHandler implements IQueryHandler<IamRawSQLRolesAccountsQuery>
{
    private readonly mapper: IamRoleAccountMapper = new IamRoleAccountMapper();

    constructor(
        private readonly rawSQLRolesAccountsService: IamRawSQLRolesAccountsService,
    ) {}

    async execute(query: IamRawSQLRolesAccountsQuery): Promise<IamRoleAccountResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLRolesAccountsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
