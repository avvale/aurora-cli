import { OAuthSumScopeQuery } from '@app/o-auth/scope';
import { OAuthSumScopeService } from '@app/o-auth/scope/application/sum/o-auth-sum-scope.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthSumScopeQuery)
export class OAuthSumScopeQueryHandler implements IQueryHandler<OAuthSumScopeQuery>
{
    constructor(
        private readonly sumScopeService: OAuthSumScopeService,
    ) {}

    async execute(query: OAuthSumScopeQuery): Promise<number>
    {
        return await this.sumScopeService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
