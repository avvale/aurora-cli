import { OAuthMinApplicationClientQuery } from '@app/o-auth/application-client';
import { OAuthMinApplicationClientService } from '@app/o-auth/application-client/application/min/o-auth-min-application-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMinApplicationClientQuery)
export class OAuthMinApplicationClientQueryHandler implements IQueryHandler<OAuthMinApplicationClientQuery>
{
    constructor(
        private readonly minApplicationClientService: OAuthMinApplicationClientService,
    ) {}

    async execute(query: OAuthMinApplicationClientQuery): Promise<number>
    {
        return await this.minApplicationClientService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
