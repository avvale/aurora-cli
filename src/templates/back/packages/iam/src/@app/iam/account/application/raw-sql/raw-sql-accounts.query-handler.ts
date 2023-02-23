import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountResponse } from '../../domain/account.response';
import { AccountMapper } from '../../domain/account.mapper';
import { RawSQLAccountsQuery } from './raw-sql-accounts.query';
import { RawSQLAccountsService } from './raw-sql-accounts.service';

@QueryHandler(RawSQLAccountsQuery)
export class RawSQLAccountsQueryHandler implements IQueryHandler<RawSQLAccountsQuery>
{
    private readonly mapper: AccountMapper = new AccountMapper();

    constructor(
        private readonly rawSQLAccountsService: RawSQLAccountsService,
    ) {}

    async execute(query: RawSQLAccountsQuery): Promise<AccountResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAccountsService.main(query.rawSQL, query.cQMetadata));
    }
}