import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthApplicationResponse } from '../../domain/o-auth-application.response';
import { OAuthApplicationMapper } from '../../domain/o-auth-application.mapper';
import { OAuthRawSQLApplicationsQuery } from './o-auth-raw-sql-applications.query';
import { OAuthRawSQLApplicationsService } from './o-auth-raw-sql-applications.service';

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
