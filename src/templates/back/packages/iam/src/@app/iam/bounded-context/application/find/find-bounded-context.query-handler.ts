import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BoundedContextResponse } from '../../domain/bounded-context.response';
import { BoundedContextMapper } from '../../domain/bounded-context.mapper';
import { FindBoundedContextQuery } from './find-bounded-context.query';
import { FindBoundedContextService } from './find-bounded-context.service';

@QueryHandler(FindBoundedContextQuery)
export class FindBoundedContextQueryHandler implements IQueryHandler<FindBoundedContextQuery>
{
    private readonly mapper: BoundedContextMapper = new BoundedContextMapper();

    constructor(
        private readonly findBoundedContextService: FindBoundedContextService,
    ) {}

    async execute(query: FindBoundedContextQuery): Promise<BoundedContextResponse>
    {
        const boundedContext = await this.findBoundedContextService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(boundedContext);
    }
}