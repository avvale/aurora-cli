import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthClientResponse } from '../../domain/o-auth-client.response';
import { OAuthClientMapper } from '../../domain/o-auth-client.mapper';
import { OAuthRawSQLClientsQuery } from './o-auth-raw-sql-clients.query';
import { OAuthRawSQLClientsService } from './o-auth-raw-sql-clients.service';

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
