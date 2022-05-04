import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountResponse } from '../../domain/account.response';
import { AccountMapper } from '../../domain/account.mapper';
import { AccountId } from '../../domain/value-objects';
import { FindAccountByIdQuery } from './find-account-by-id.query';
import { FindAccountByIdService } from './find-account-by-id.service';

@QueryHandler(FindAccountByIdQuery)
export class FindAccountByIdQueryHandler implements IQueryHandler<FindAccountByIdQuery>
{
    private readonly mapper: AccountMapper = new AccountMapper();

    constructor(
        private readonly findAccountByIdService: FindAccountByIdService,
    ) {}

    async execute(query: FindAccountByIdQuery): Promise<AccountResponse>
    {
        const account = await this.findAccountByIdService.main(
            new AccountId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(account);
    }
}