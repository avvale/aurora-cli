import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopeResponse } from '../../domain/scope.response';
import { ScopeMapper } from '../../domain/scope.mapper';
import { RawSQLScopesQuery } from './raw-sql-scopes.query';
import { RawSQLScopesService } from './raw-sql-scopes.service';

@QueryHandler(RawSQLScopesQuery)
export class RawSQLScopesQueryHandler implements IQueryHandler<RawSQLScopesQuery>
{
    private readonly mapper: ScopeMapper = new ScopeMapper();

    constructor(
        private readonly rawSQLScopesService: RawSQLScopesService,
    ) {}

    async execute(query: RawSQLScopesQuery): Promise<ScopeResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLScopesService.main(query.rawSQL, query.cQMetadata));
    }
}