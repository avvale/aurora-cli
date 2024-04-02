import { OAuthCountScopeQuery } from '@app/o-auth/scope';
import { OAuthCountScopeService } from '@app/o-auth/scope/application/count/o-auth-count-scope.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthCountScopeQuery)
export class OAuthCountScopeQueryHandler implements IQueryHandler<OAuthCountScopeQuery>
{
    constructor(
        private readonly countScopeService: OAuthCountScopeService,
    ) {}

    async execute(query: OAuthCountScopeQuery): Promise<number>
    {
        return await this.countScopeService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
