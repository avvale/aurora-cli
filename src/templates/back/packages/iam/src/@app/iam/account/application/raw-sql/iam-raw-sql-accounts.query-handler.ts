import { IamAccountMapper, IamAccountResponse, IamRawSQLAccountsQuery } from '@app/iam/account';
import { IamRawSQLAccountsService } from '@app/iam/account/application/raw-sql/iam-raw-sql-accounts.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLAccountsQuery)
export class IamRawSQLAccountsQueryHandler implements IQueryHandler<IamRawSQLAccountsQuery>
{
    private readonly mapper: IamAccountMapper = new IamAccountMapper();

    constructor(
        private readonly rawSQLAccountsService: IamRawSQLAccountsService,
    ) {}

    async execute(query: IamRawSQLAccountsQuery): Promise<IamAccountResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAccountsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
