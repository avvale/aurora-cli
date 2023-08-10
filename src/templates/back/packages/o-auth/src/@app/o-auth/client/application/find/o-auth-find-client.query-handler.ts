import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthClientResponse } from '../../domain/o-auth-client.response';
import { OAuthClientMapper } from '../../domain/o-auth-client.mapper';
import { OAuthFindClientQuery } from './o-auth-find-client.query';
import { OAuthFindClientService } from './o-auth-find-client.service';

@QueryHandler(OAuthFindClientQuery)
export class OAuthFindClientQueryHandler implements IQueryHandler<OAuthFindClientQuery>
{
    private readonly mapper: OAuthClientMapper = new OAuthClientMapper();

    constructor(
        private readonly findClientService: OAuthFindClientService,
    ) {}

    async execute(query: OAuthFindClientQuery): Promise<OAuthClientResponse>
    {
        const client = await this.findClientService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(client);
    }
}
