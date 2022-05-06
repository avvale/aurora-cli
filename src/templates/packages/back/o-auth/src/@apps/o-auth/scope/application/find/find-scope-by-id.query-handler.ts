import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScopeResponse } from '../../domain/scope.response';
import { ScopeMapper } from '../../domain/scope.mapper';
import { ScopeId } from '../../domain/value-objects';
import { FindScopeByIdQuery } from './find-scope-by-id.query';
import { FindScopeByIdService } from './find-scope-by-id.service';

@QueryHandler(FindScopeByIdQuery)
export class FindScopeByIdQueryHandler implements IQueryHandler<FindScopeByIdQuery>
{
    private readonly mapper: ScopeMapper = new ScopeMapper();

    constructor(
        private readonly findScopeByIdService: FindScopeByIdService,
    ) {}

    async execute(query: FindScopeByIdQuery): Promise<ScopeResponse>
    {
        const scope = await this.findScopeByIdService.main(
            new ScopeId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(scope);
    }
}