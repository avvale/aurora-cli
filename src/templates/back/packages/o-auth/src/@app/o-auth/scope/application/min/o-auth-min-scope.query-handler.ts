import { OAuthMinScopeQuery } from '@app/o-auth/scope';
import { OAuthMinScopeService } from '@app/o-auth/scope/application/min/o-auth-min-scope.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMinScopeQuery)
export class OAuthMinScopeQueryHandler implements IQueryHandler<OAuthMinScopeQuery>
{
    constructor(
        private readonly minScopeService: OAuthMinScopeService,
    ) {}

    async execute(query: OAuthMinScopeQuery): Promise<number>
    {
        return await this.minScopeService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
