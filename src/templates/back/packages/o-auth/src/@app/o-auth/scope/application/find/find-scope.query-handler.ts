import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopeResponse } from '../../domain/scope.response';
import { ScopeMapper } from '../../domain/scope.mapper';
import { FindScopeQuery } from './find-scope.query';
import { FindScopeService } from './find-scope.service';

@QueryHandler(FindScopeQuery)
export class FindScopeQueryHandler implements IQueryHandler<FindScopeQuery>
{
    private readonly mapper: ScopeMapper = new ScopeMapper();

    constructor(
        private readonly findScopeService: FindScopeService,
    ) {}

    async execute(query: FindScopeQuery): Promise<ScopeResponse>
    {
        const scope = await this.findScopeService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(scope);
    }
}