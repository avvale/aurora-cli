import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthApplicationMapper, OAuthApplicationResponse } from '@app/o-auth/application';
import { OAuthApplicationAuthorizationHeader } from '../../domain/value-objects/o-auth-application-authorization-header';
import { OAuthFindApplicationByAuthorizationHeaderQuery } from './o-auth-find-application-by-authorization-header.query';
import { OAuthFindApplicationByAuthorizationHeaderService } from './o-auth-find-application-by-authorization-header.service';

@QueryHandler(OAuthFindApplicationByAuthorizationHeaderQuery)
export class OAuthFindApplicationByAuthorizationHeaderQueryHandler implements IQueryHandler<OAuthFindApplicationByAuthorizationHeaderQuery>
{
    private readonly mapper: OAuthApplicationMapper = new OAuthApplicationMapper();

    constructor(
        private readonly findApplicationByAuthorizationHeaderService: OAuthFindApplicationByAuthorizationHeaderService,
    ) { }

    async execute(query: OAuthFindApplicationByAuthorizationHeaderQuery): Promise<OAuthApplicationResponse>
    {
        const application = await this.findApplicationByAuthorizationHeaderService.main(
            new OAuthApplicationAuthorizationHeader(query.authorizationHeader),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(application);
    }
}