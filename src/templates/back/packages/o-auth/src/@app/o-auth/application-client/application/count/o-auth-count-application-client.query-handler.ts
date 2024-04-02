import { OAuthCountApplicationClientQuery } from '@app/o-auth/application-client';
import { OAuthCountApplicationClientService } from '@app/o-auth/application-client/application/count/o-auth-count-application-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthCountApplicationClientQuery)
export class OAuthCountApplicationClientQueryHandler implements IQueryHandler<OAuthCountApplicationClientQuery>
{
    constructor(
        private readonly countApplicationClientService: OAuthCountApplicationClientService,
    ) {}

    async execute(query: OAuthCountApplicationClientQuery): Promise<number>
    {
        return await this.countApplicationClientService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
