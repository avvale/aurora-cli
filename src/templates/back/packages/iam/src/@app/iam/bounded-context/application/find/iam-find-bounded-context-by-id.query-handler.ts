import {
    IamBoundedContextMapper,
    IamBoundedContextResponse,
    IamFindBoundedContextByIdQuery,
} from '@app/iam/bounded-context';
import { IamFindBoundedContextByIdService } from '@app/iam/bounded-context/application/find/iam-find-bounded-context-by-id.service';
import { IamBoundedContextId } from '@app/iam/bounded-context/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindBoundedContextByIdQuery)
export class IamFindBoundedContextByIdQueryHandler
    implements IQueryHandler<IamFindBoundedContextByIdQuery>
{
    private readonly mapper: IamBoundedContextMapper =
        new IamBoundedContextMapper();

    constructor(
        private readonly findBoundedContextByIdService: IamFindBoundedContextByIdService,
    ) {}

    async execute(
        query: IamFindBoundedContextByIdQuery,
    ): Promise<IamBoundedContextResponse> {
        const boundedContext = await this.findBoundedContextByIdService.main(
            new IamBoundedContextId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(boundedContext);
    }
}
