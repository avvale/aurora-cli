import { OAuthApplicationMapper, OAuthApplicationResponse, OAuthRawSQLApplicationsQuery } from '@app/o-auth/application';
import { OAuthRawSQLApplicationsService } from '@app/o-auth/application/application/raw-sql/o-auth-raw-sql-applications.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthRawSQLApplicationsQuery)
export class OAuthRawSQLApplicationsQueryHandler implements IQueryHandler<OAuthRawSQLApplicationsQuery>
{
    private readonly mapper: OAuthApplicationMapper = new OAuthApplicationMapper();

    constructor(
        private readonly rawSQLApplicationsService: OAuthRawSQLApplicationsService,
    ) {}

    async execute(query: OAuthRawSQLApplicationsQuery): Promise<OAuthApplicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
