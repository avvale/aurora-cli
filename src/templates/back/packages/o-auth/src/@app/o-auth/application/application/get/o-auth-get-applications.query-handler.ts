import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthApplicationResponse } from '../../domain/o-auth-application.response';
import { OAuthApplicationMapper } from '../../domain/o-auth-application.mapper';
import { OAuthGetApplicationsQuery } from './o-auth-get-applications.query';
import { OAuthGetApplicationsService } from './o-auth-get-applications.service';

@QueryHandler(OAuthGetApplicationsQuery)
export class OAuthGetApplicationsQueryHandler implements IQueryHandler<OAuthGetApplicationsQuery>
{
    private readonly mapper: OAuthApplicationMapper = new OAuthApplicationMapper();

    constructor(
        private readonly getApplicationsService: OAuthGetApplicationsService,
    ) {}

    async execute(query: OAuthGetApplicationsQuery): Promise<OAuthApplicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
