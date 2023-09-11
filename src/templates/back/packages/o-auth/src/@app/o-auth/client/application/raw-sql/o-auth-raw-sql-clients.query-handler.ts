import { OAuthClientMapper, OAuthClientResponse, OAuthRawSQLClientsQuery } from '@app/o-auth/client';
import { OAuthRawSQLClientsService } from '@app/o-auth/client/application/raw-sql/o-auth-raw-sql-clients.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthRawSQLClientsQuery)
export class OAuthRawSQLClientsQueryHandler implements IQueryHandler<OAuthRawSQLClientsQuery>
{
    private readonly mapper: OAuthClientMapper = new OAuthClientMapper();

    constructor(
        private readonly rawSQLClientsService: OAuthRawSQLClientsService,
    ) {}

    async execute(query: OAuthRawSQLClientsQuery): Promise<OAuthClientResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLClientsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
