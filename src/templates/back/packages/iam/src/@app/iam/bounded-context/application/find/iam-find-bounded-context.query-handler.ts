import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamBoundedContextResponse } from '../../domain/iam-bounded-context.response';
import { IamBoundedContextMapper } from '../../domain/iam-bounded-context.mapper';
import { IamFindBoundedContextQuery } from './iam-find-bounded-context.query';
import { IamFindBoundedContextService } from './iam-find-bounded-context.service';

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
