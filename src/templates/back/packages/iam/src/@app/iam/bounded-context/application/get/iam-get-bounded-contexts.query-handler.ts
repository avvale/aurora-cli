import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamBoundedContextResponse } from '../../domain/iam-bounded-context.response';
import { IamBoundedContextMapper } from '../../domain/iam-bounded-context.mapper';
import { IamGetBoundedContextsQuery } from './iam-get-bounded-contexts.query';
import { IamGetBoundedContextsService } from './iam-get-bounded-contexts.service';

@QueryHandler(IamGetBoundedContextsQuery)
export class IamGetBoundedContextsQueryHandler implements IQueryHandler<IamGetBoundedContextsQuery>
{
    private readonly mapper: IamBoundedContextMapper = new IamBoundedContextMapper();

    constructor(
        private readonly getBoundedContextsService: IamGetBoundedContextsService,
    ) {}

    async execute(query: IamGetBoundedContextsQuery): Promise<IamBoundedContextResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getBoundedContextsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
