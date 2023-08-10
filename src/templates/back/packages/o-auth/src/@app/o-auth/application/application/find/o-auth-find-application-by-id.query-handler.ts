import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthApplicationResponse } from '../../domain/o-auth-application.response';
import { OAuthApplicationMapper } from '../../domain/o-auth-application.mapper';
import { OAuthApplicationId } from '../../domain/value-objects';
import { OAuthFindApplicationByIdQuery } from './o-auth-find-application-by-id.query';
import { OAuthFindApplicationByIdService } from './o-auth-find-application-by-id.service';

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
