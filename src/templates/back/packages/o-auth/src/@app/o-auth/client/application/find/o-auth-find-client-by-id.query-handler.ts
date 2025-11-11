import {
    OAuthClientMapper,
    OAuthClientResponse,
    OAuthFindClientByIdQuery,
} from '@app/o-auth/client';
import { OAuthFindClientByIdService } from '@app/o-auth/client/application/find/o-auth-find-client-by-id.service';
import { OAuthClientId } from '@app/o-auth/client/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindClientByIdQuery)
export class OAuthFindClientByIdQueryHandler
    implements IQueryHandler<OAuthFindClientByIdQuery>
{
    private readonly mapper: OAuthClientMapper = new OAuthClientMapper();

    constructor(
        private readonly findClientByIdService: OAuthFindClientByIdService,
    ) {}

    async execute(
        query: OAuthFindClientByIdQuery,
    ): Promise<OAuthClientResponse> {
        const client = await this.findClientByIdService.main(
            new OAuthClientId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(client);
    }
}
