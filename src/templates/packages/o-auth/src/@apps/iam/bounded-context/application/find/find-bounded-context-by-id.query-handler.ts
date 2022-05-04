import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BoundedContextResponse } from '../../domain/bounded-context.response';
import { BoundedContextMapper } from '../../domain/bounded-context.mapper';
import { BoundedContextId } from '../../domain/value-objects';
import { FindBoundedContextByIdQuery } from './find-bounded-context-by-id.query';
import { FindBoundedContextByIdService } from './find-bounded-context-by-id.service';

@QueryHandler(FindBoundedContextByIdQuery)
export class FindBoundedContextByIdQueryHandler implements IQueryHandler<FindBoundedContextByIdQuery>
{
    private readonly mapper: BoundedContextMapper = new BoundedContextMapper();

    constructor(
        private readonly findBoundedContextByIdService: FindBoundedContextByIdService,
    ) {}

    async execute(query: FindBoundedContextByIdQuery): Promise<BoundedContextResponse>
    {
        const boundedContext = await this.findBoundedContextByIdService.main(
            new BoundedContextId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(boundedContext);
    }
}