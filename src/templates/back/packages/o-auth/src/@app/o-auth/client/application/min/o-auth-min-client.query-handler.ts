import { OAuthMinClientQuery } from '@app/o-auth/client';
import { OAuthMinClientService } from '@app/o-auth/client/application/min/o-auth-min-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMinClientQuery)
export class OAuthMinClientQueryHandler implements IQueryHandler<OAuthMinClientQuery>
{
    constructor(
        private readonly minClientService: OAuthMinClientService,
    ) {}

    async execute(query: OAuthMinClientQuery): Promise<number>
    {
        return await this.minClientService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
