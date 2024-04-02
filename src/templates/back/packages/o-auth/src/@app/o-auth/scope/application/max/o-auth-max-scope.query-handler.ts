import { OAuthMaxScopeQuery } from '@app/o-auth/scope';
import { OAuthMaxScopeService } from '@app/o-auth/scope/application/max/o-auth-max-scope.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMaxScopeQuery)
export class OAuthMaxScopeQueryHandler implements IQueryHandler<OAuthMaxScopeQuery>
{
    constructor(
        private readonly maxScopeService: OAuthMaxScopeService,
    ) {}

    async execute(query: OAuthMaxScopeQuery): Promise<number>
    {
        return await this.maxScopeService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
