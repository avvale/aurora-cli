import {
    OAuthApplicationClientMapper,
    OAuthApplicationClientResponse,
    OAuthFindApplicationClientQuery,
} from '@app/o-auth/application-client';
import { OAuthFindApplicationClientService } from '@app/o-auth/application-client/application/find/o-auth-find-application-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindApplicationClientQuery)
export class OAuthFindApplicationClientQueryHandler
    implements IQueryHandler<OAuthFindApplicationClientQuery>
{
    private readonly mapper: OAuthApplicationClientMapper =
        new OAuthApplicationClientMapper();

    constructor(
        private readonly findApplicationClientService: OAuthFindApplicationClientService,
    ) {}

    async execute(
        query: OAuthFindApplicationClientQuery,
    ): Promise<OAuthApplicationClientResponse> {
        const applicationClient = await this.findApplicationClientService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationClient);
    }
}
