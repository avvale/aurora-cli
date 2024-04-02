import { OAuthMaxClientQuery } from '@app/o-auth/client';
import { OAuthMaxClientService } from '@app/o-auth/client/application/max/o-auth-max-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMaxClientQuery)
export class OAuthMaxClientQueryHandler implements IQueryHandler<OAuthMaxClientQuery>
{
    constructor(
        private readonly maxClientService: OAuthMaxClientService,
    ) {}

    async execute(query: OAuthMaxClientQuery): Promise<number>
    {
        return await this.maxClientService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
