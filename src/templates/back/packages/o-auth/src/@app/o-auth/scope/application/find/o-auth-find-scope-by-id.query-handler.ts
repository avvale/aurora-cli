import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthScopeResponse } from '../../domain/o-auth-scope.response';
import { OAuthScopeMapper } from '../../domain/o-auth-scope.mapper';
import { OAuthScopeId } from '../../domain/value-objects';
import { OAuthFindScopeByIdQuery } from './o-auth-find-scope-by-id.query';
import { OAuthFindScopeByIdService } from './o-auth-find-scope-by-id.service';

@QueryHandler(OAuthFindScopeByIdQuery)
export class OAuthFindScopeByIdQueryHandler implements IQueryHandler<OAuthFindScopeByIdQuery>
{
    private readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

    constructor(
        private readonly findScopeByIdService: OAuthFindScopeByIdService,
    ) {}

    async execute(query: OAuthFindScopeByIdQuery): Promise<OAuthScopeResponse>
    {
        const scope = await this.findScopeByIdService.main(
            new OAuthScopeId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(scope);
    }
}
