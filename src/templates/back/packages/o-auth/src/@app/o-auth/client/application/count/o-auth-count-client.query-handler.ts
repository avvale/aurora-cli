import { OAuthCountClientQuery } from '@app/o-auth/client';
import { OAuthCountClientService } from '@app/o-auth/client/application/count/o-auth-count-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthCountClientQuery)
export class OAuthCountClientQueryHandler implements IQueryHandler<OAuthCountClientQuery>
{
    constructor(
        private readonly countClientService: OAuthCountClientService,
    ) {}

    async execute(query: OAuthCountClientQuery): Promise<number>
    {
        return await this.countClientService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
