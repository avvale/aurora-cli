import { IamBoundedContextMapper, IamBoundedContextResponse, IamGetBoundedContextsQuery } from '@app/iam/bounded-context';
import { IamGetBoundedContextsService } from '@app/iam/bounded-context/application/get/iam-get-bounded-contexts.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetBoundedContextsQuery)
export class IamGetBoundedContextsQueryHandler implements IQueryHandler<IamGetBoundedContextsQuery>
{
    private readonly mapper: IamBoundedContextMapper = new IamBoundedContextMapper();

    constructor(
        private readonly getBoundedContextsService: IamGetBoundedContextsService,
    ) {}

    async execute(query: IamGetBoundedContextsQuery): Promise<IamBoundedContextResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getBoundedContextsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
