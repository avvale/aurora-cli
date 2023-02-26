import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BoundedContextResponse } from '../../domain/bounded-context.response';
import { BoundedContextMapper } from '../../domain/bounded-context.mapper';
import { RawSQLBoundedContextsQuery } from './raw-sql-bounded-contexts.query';
import { RawSQLBoundedContextsService } from './raw-sql-bounded-contexts.service';

@QueryHandler(RawSQLBoundedContextsQuery)
export class RawSQLBoundedContextsQueryHandler implements IQueryHandler<RawSQLBoundedContextsQuery>
{
    private readonly mapper: BoundedContextMapper = new BoundedContextMapper();

    constructor(
        private readonly rawSQLBoundedContextsService: RawSQLBoundedContextsService,
    ) {}

    async execute(query: RawSQLBoundedContextsQuery): Promise<BoundedContextResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLBoundedContextsService.main(query.rawSQL, query.cQMetadata));
    }
}