import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountResponse } from '../../domain/account.response';
import { AccountMapper } from '../../domain/account.mapper';
import { GetAccountsQuery } from './get-accounts.query';
import { GetAccountsService } from './get-accounts.service';

@QueryHandler(GetAccountsQuery)
export class GetAccountsQueryHandler implements IQueryHandler<GetAccountsQuery>
{
    private readonly mapper: AccountMapper = new AccountMapper();

    constructor(
        private readonly getAccountsService: GetAccountsService,
    ) {}

    async execute(query: GetAccountsQuery): Promise<AccountResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAccountsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}