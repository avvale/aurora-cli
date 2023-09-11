import { OAuthApplicationMapper, OAuthApplicationResponse, OAuthGetApplicationsQuery } from '@app/o-auth/application';
import { OAuthGetApplicationsService } from '@app/o-auth/application/application/get/o-auth-get-applications.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetApplicationsQuery)
export class OAuthGetApplicationsQueryHandler implements IQueryHandler<OAuthGetApplicationsQuery>
{
    private readonly mapper: OAuthApplicationMapper = new OAuthApplicationMapper();

    constructor(
        private readonly getApplicationsService: OAuthGetApplicationsService,
    ) {}

    async execute(query: OAuthGetApplicationsQuery): Promise<OAuthApplicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getApplicationsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
