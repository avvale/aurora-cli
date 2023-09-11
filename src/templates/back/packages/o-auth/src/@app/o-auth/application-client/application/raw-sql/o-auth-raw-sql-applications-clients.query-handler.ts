import { OAuthApplicationClientMapper, OAuthApplicationClientResponse, OAuthRawSQLApplicationsClientsQuery } from '@app/o-auth/application-client';
import { OAuthRawSQLApplicationsClientsService } from '@app/o-auth/application-client/application/raw-sql/o-auth-raw-sql-applications-clients.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthRawSQLApplicationsClientsQuery)
export class OAuthRawSQLApplicationsClientsQueryHandler implements IQueryHandler<OAuthRawSQLApplicationsClientsQuery>
{
    private readonly mapper: OAuthApplicationClientMapper = new OAuthApplicationClientMapper();

    constructor(
        private readonly rawSQLApplicationsClientsService: OAuthRawSQLApplicationsClientsService,
    ) {}

    async execute(query: OAuthRawSQLApplicationsClientsQuery): Promise<OAuthApplicationClientResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationsClientsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
