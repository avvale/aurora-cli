import { IamCountBoundedContextQuery } from '@app/iam/bounded-context';
import { IamCountBoundedContextService } from '@app/iam/bounded-context/application/count/iam-count-bounded-context.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountBoundedContextQuery)
export class IamCountBoundedContextQueryHandler implements IQueryHandler<IamCountBoundedContextQuery>
{
    constructor(
        private readonly countBoundedContextService: IamCountBoundedContextService,
    ) {}

    async execute(query: IamCountBoundedContextQuery): Promise<number>
    {
        return await this.countBoundedContextService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
