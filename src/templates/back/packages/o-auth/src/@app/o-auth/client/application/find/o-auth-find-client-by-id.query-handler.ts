import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthClientResponse } from '../../domain/o-auth-client.response';
import { OAuthClientMapper } from '../../domain/o-auth-client.mapper';
import { OAuthClientId } from '../../domain/value-objects';
import { OAuthFindClientByIdQuery } from './o-auth-find-client-by-id.query';
import { OAuthFindClientByIdService } from './o-auth-find-client-by-id.service';

@QueryHandler(OAuthFindClientByIdQuery)
export class OAuthFindClientByIdQueryHandler implements IQueryHandler<OAuthFindClientByIdQuery>
{
    private readonly mapper: OAuthClientMapper = new OAuthClientMapper();

    constructor(
        private readonly findClientByIdService: OAuthFindClientByIdService,
    ) {}

    async execute(query: OAuthFindClientByIdQuery): Promise<OAuthClientResponse>
    {
        const client = await this.findClientByIdService.main(
            new OAuthClientId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(client);
    }
}
