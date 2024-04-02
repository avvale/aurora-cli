import { IamSumAccountQuery } from '@app/iam/account';
import { IamSumAccountService } from '@app/iam/account/application/sum/iam-sum-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumAccountQuery)
export class IamSumAccountQueryHandler implements IQueryHandler<IamSumAccountQuery>
{
    constructor(
        private readonly sumAccountService: IamSumAccountService,
    ) {}

    async execute(query: IamSumAccountQuery): Promise<number>
    {
        return await this.sumAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
