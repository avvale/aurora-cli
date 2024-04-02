import { OAuthSumApplicationQuery } from '@app/o-auth/application';
import { OAuthSumApplicationService } from '@app/o-auth/application/application/sum/o-auth-sum-application.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthSumApplicationQuery)
export class OAuthSumApplicationQueryHandler implements IQueryHandler<OAuthSumApplicationQuery>
{
    constructor(
        private readonly sumApplicationService: OAuthSumApplicationService,
    ) {}

    async execute(query: OAuthSumApplicationQuery): Promise<number>
    {
        return await this.sumApplicationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
