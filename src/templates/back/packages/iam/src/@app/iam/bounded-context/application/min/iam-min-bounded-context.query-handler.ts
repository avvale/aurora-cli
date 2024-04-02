import { IamMinBoundedContextQuery } from '@app/iam/bounded-context';
import { IamMinBoundedContextService } from '@app/iam/bounded-context/application/min/iam-min-bounded-context.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinBoundedContextQuery)
export class IamMinBoundedContextQueryHandler implements IQueryHandler<IamMinBoundedContextQuery>
{
    constructor(
        private readonly minBoundedContextService: IamMinBoundedContextService,
    ) {}

    async execute(query: IamMinBoundedContextQuery): Promise<number>
    {
        return await this.minBoundedContextService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
