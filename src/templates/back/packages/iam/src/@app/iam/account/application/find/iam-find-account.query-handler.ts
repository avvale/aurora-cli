import { IamAccountMapper, IamAccountResponse, IamFindAccountQuery } from '@app/iam/account';
import { IamFindAccountService } from '@app/iam/account/application/find/iam-find-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
