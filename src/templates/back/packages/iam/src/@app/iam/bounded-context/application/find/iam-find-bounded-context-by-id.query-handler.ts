import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamBoundedContextResponse } from '../../domain/iam-bounded-context.response';
import { IamBoundedContextMapper } from '../../domain/iam-bounded-context.mapper';
import { IamBoundedContextId } from '../../domain/value-objects';
import { IamFindBoundedContextByIdQuery } from './iam-find-bounded-context-by-id.query';
import { IamFindBoundedContextByIdService } from './iam-find-bounded-context-by-id.service';

@QueryHandler(IamFindBoundedContextByIdQuery)
export class IamFindBoundedContextByIdQueryHandler implements IQueryHandler<IamFindBoundedContextByIdQuery>
{
    private readonly mapper: IamBoundedContextMapper = new IamBoundedContextMapper();

    constructor(
        private readonly findBoundedContextByIdService: IamFindBoundedContextByIdService,
    ) {}

    async execute(query: IamFindBoundedContextByIdQuery): Promise<IamBoundedContextResponse>
    {
        const boundedContext = await this.findBoundedContextByIdService.main(
            new IamBoundedContextId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(boundedContext);
    }
}
