import {
    OAuthFindScopeByIdQuery,
    OAuthScopeMapper,
    OAuthScopeResponse,
} from '@app/o-auth/scope';
import { OAuthFindScopeByIdService } from '@app/o-auth/scope/application/find/o-auth-find-scope-by-id.service';
import { OAuthScopeId } from '@app/o-auth/scope/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindScopeByIdQuery)
export class OAuthFindScopeByIdQueryHandler
    implements IQueryHandler<OAuthFindScopeByIdQuery>
{
    private readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

    constructor(
        private readonly findScopeByIdService: OAuthFindScopeByIdService,
    ) {}

    async execute(query: OAuthFindScopeByIdQuery): Promise<OAuthScopeResponse> {
        const scope = await this.findScopeByIdService.main(
            new OAuthScopeId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(scope);
    }
}
