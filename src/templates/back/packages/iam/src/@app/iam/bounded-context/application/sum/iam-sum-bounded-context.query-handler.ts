import { IamSumBoundedContextQuery } from '@app/iam/bounded-context';
import { IamSumBoundedContextService } from '@app/iam/bounded-context/application/sum/iam-sum-bounded-context.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumBoundedContextQuery)
export class IamSumBoundedContextQueryHandler implements IQueryHandler<IamSumBoundedContextQuery>
{
    constructor(
        private readonly sumBoundedContextService: IamSumBoundedContextService,
    ) {}

    async execute(query: IamSumBoundedContextQuery): Promise<number>
    {
        return await this.sumBoundedContextService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
