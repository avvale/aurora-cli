import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamAccountResponse } from '../../domain/iam-account.response';
import { IamAccountMapper } from '../../domain/iam-account.mapper';
import { IamRawSQLAccountsQuery } from './iam-raw-sql-accounts.query';
import { IamRawSQLAccountsService } from './iam-raw-sql-accounts.service';

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
