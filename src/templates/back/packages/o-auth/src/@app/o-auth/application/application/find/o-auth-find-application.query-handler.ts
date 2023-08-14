import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthApplicationResponse } from '../../domain/o-auth-application.response';
import { OAuthApplicationMapper } from '../../domain/o-auth-application.mapper';
import { OAuthFindApplicationQuery } from './o-auth-find-application.query';
import { OAuthFindApplicationService } from './o-auth-find-application.service';

@QueryHandler(OAuthFindApplicationQuery)
export class OAuthFindApplicationQueryHandler implements IQueryHandler<OAuthFindApplicationQuery>
{
    private readonly mapper: OAuthApplicationMapper = new OAuthApplicationMapper();

    constructor(
        private readonly findApplicationService: OAuthFindApplicationService,
    ) {}

    async execute(query: OAuthFindApplicationQuery): Promise<OAuthApplicationResponse>
    {
        const application = await this.findApplicationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(application);
    }
}
