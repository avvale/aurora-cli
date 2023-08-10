import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamAccountResponse } from '../../domain/iam-account.response';
import { IamAccountMapper } from '../../domain/iam-account.mapper';
import { IamFindAccountQuery } from './iam-find-account.query';
import { IamFindAccountService } from './iam-find-account.service';

@QueryHandler(IamFindAccountQuery)
export class IamFindAccountQueryHandler implements IQueryHandler<IamFindAccountQuery>
{
    private readonly mapper: IamAccountMapper = new IamAccountMapper();

    constructor(
        private readonly findAccountService: IamFindAccountService,
    ) {}

    async execute(query: IamFindAccountQuery): Promise<IamAccountResponse>
    {
        const account = await this.findAccountService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(account);
    }
}
