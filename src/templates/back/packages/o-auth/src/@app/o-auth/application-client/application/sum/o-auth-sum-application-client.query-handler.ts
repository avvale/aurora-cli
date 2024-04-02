import { OAuthSumApplicationClientQuery } from '@app/o-auth/application-client';
import { OAuthSumApplicationClientService } from '@app/o-auth/application-client/application/sum/o-auth-sum-application-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthSumApplicationClientQuery)
export class OAuthSumApplicationClientQueryHandler implements IQueryHandler<OAuthSumApplicationClientQuery>
{
    constructor(
        private readonly sumApplicationClientService: OAuthSumApplicationClientService,
    ) {}

    async execute(query: OAuthSumApplicationClientQuery): Promise<number>
    {
        return await this.sumApplicationClientService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
