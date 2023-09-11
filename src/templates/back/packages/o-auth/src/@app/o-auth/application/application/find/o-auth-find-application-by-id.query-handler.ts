import { OAuthApplicationMapper, OAuthApplicationResponse, OAuthFindApplicationByIdQuery } from '@app/o-auth/application';
import { OAuthFindApplicationByIdService } from '@app/o-auth/application/application/find/o-auth-find-application-by-id.service';
import { OAuthApplicationId } from '@app/o-auth/application/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindApplicationByIdQuery)
export class OAuthFindApplicationByIdQueryHandler implements IQueryHandler<OAuthFindApplicationByIdQuery>
{
    private readonly mapper: OAuthApplicationMapper = new OAuthApplicationMapper();

    constructor(
        private readonly findApplicationByIdService: OAuthFindApplicationByIdService,
    ) {}

    async execute(query: OAuthFindApplicationByIdQuery): Promise<OAuthApplicationResponse>
    {
        const application = await this.findApplicationByIdService.main(
            new OAuthApplicationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(application);
    }
}
