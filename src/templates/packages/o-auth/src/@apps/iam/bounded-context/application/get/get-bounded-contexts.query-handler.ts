import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BoundedContextResponse } from '../../domain/bounded-context.response';
import { BoundedContextMapper } from '../../domain/bounded-context.mapper';
import { GetBoundedContextsQuery } from './get-bounded-contexts.query';
import { GetBoundedContextsService } from './get-bounded-contexts.service';

@QueryHandler(GetBoundedContextsQuery)
export class GetBoundedContextsQueryHandler implements IQueryHandler<GetBoundedContextsQuery>
{
    private readonly mapper: BoundedContextMapper = new BoundedContextMapper();

    constructor(
        private readonly getBoundedContextsService: GetBoundedContextsService,
    ) {}

    async execute(query: GetBoundedContextsQuery): Promise<BoundedContextResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getBoundedContextsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}