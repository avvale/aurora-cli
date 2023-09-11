import { IamBoundedContextMapper, IamBoundedContextResponse, IamFindBoundedContextQuery } from '@app/iam/bounded-context';
import { IamFindBoundedContextService } from '@app/iam/bounded-context/application/find/iam-find-bounded-context.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindBoundedContextQuery)
export class IamFindBoundedContextQueryHandler implements IQueryHandler<IamFindBoundedContextQuery>
{
    private readonly mapper: IamBoundedContextMapper = new IamBoundedContextMapper();

    constructor(
        private readonly findBoundedContextService: IamFindBoundedContextService,
    ) {}

    async execute(query: IamFindBoundedContextQuery): Promise<IamBoundedContextResponse>
    {
        const boundedContext = await this.findBoundedContextService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(boundedContext);
    }
}
