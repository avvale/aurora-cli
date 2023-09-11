import { OAuthApplicationClientMapper, OAuthApplicationClientResponse, OAuthFindApplicationClientByIdQuery } from '@app/o-auth/application-client';
import { OAuthFindApplicationClientByIdService } from '@app/o-auth/application-client/application/find/o-auth-find-application-client-by-id.service';
import { OAuthApplicationClientApplicationId, OAuthApplicationClientClientId } from '@app/o-auth/application-client/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindApplicationClientByIdQuery)
export class OAuthFindApplicationClientByIdQueryHandler implements IQueryHandler<OAuthFindApplicationClientByIdQuery>
{
    private readonly mapper: OAuthApplicationClientMapper = new OAuthApplicationClientMapper();

    constructor(
        private readonly findApplicationClientByIdService: OAuthFindApplicationClientByIdService,
    ) {}

    async execute(query: OAuthFindApplicationClientByIdQuery): Promise<OAuthApplicationClientResponse>
    {
        const applicationClient = await this.findApplicationClientByIdService.main(
            new OAuthApplicationClientApplicationId(query.applicationId),
            new OAuthApplicationClientClientId(query.clientId),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationClient);
    }
}
