import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountResponse } from '../../domain/account.response';
import { AccountMapper } from '../../domain/account.mapper';
import { FindAccountQuery } from './find-account.query';
import { FindAccountService } from './find-account.service';

@QueryHandler(FindAccountQuery)
export class FindAccountQueryHandler implements IQueryHandler<FindAccountQuery>
{
    private readonly mapper: AccountMapper = new AccountMapper();

    constructor(
        private readonly findAccountService: FindAccountService,
    ) {}

    async execute(query: FindAccountQuery): Promise<AccountResponse>
    {
        const account = await this.findAccountService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(account);
    }
}