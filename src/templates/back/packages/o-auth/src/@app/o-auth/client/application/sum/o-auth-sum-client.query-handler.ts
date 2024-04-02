import { OAuthSumClientQuery } from '@app/o-auth/client';
import { OAuthSumClientService } from '@app/o-auth/client/application/sum/o-auth-sum-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthSumClientQuery)
export class OAuthSumClientQueryHandler implements IQueryHandler<OAuthSumClientQuery>
{
    constructor(
        private readonly sumClientService: OAuthSumClientService,
    ) {}

    async execute(query: OAuthSumClientQuery): Promise<number>
    {
        return await this.sumClientService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
