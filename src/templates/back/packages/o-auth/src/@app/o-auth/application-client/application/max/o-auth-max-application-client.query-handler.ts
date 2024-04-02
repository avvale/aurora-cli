import { OAuthMaxApplicationClientQuery } from '@app/o-auth/application-client';
import { OAuthMaxApplicationClientService } from '@app/o-auth/application-client/application/max/o-auth-max-application-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMaxApplicationClientQuery)
export class OAuthMaxApplicationClientQueryHandler implements IQueryHandler<OAuthMaxApplicationClientQuery>
{
    constructor(
        private readonly maxApplicationClientService: OAuthMaxApplicationClientService,
    ) {}

    async execute(query: OAuthMaxApplicationClientQuery): Promise<number>
    {
        return await this.maxApplicationClientService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
