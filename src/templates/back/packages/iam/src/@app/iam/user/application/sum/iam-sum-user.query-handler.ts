import { IamSumUserQuery } from '@app/iam/user';
import { IamSumUserService } from '@app/iam/user/application/sum/iam-sum-user.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumUserQuery)
export class IamSumUserQueryHandler implements IQueryHandler<IamSumUserQuery>
{
    constructor(
        private readonly sumUserService: IamSumUserService,
    ) {}

    async execute(query: IamSumUserQuery): Promise<number>
    {
        return await this.sumUserService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
