import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopeResponse } from '../../domain/scope.response';
import { ScopeMapper } from '../../domain/scope.mapper';
import { GetScopesQuery } from './get-scopes.query';
import { GetScopesService } from './get-scopes.service';

@QueryHandler(GetScopesQuery)
export class GetScopesQueryHandler implements IQueryHandler<GetScopesQuery>
{
    private readonly mapper: ScopeMapper = new ScopeMapper();

    constructor(
        private readonly getScopesService: GetScopesService,
    ) {}

    async execute(query: GetScopesQuery): Promise<ScopeResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getScopesService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}