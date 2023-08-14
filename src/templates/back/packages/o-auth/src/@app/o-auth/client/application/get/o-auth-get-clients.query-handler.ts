import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthClientResponse } from '../../domain/o-auth-client.response';
import { OAuthClientMapper } from '../../domain/o-auth-client.mapper';
import { OAuthGetClientsQuery } from './o-auth-get-clients.query';
import { OAuthGetClientsService } from './o-auth-get-clients.service';

@QueryHandler(OAuthGetClientsQuery)
export class OAuthGetClientsQueryHandler implements IQueryHandler<OAuthGetClientsQuery>
{
    private readonly mapper: OAuthClientMapper = new OAuthClientMapper();

    constructor(
        private readonly getClientsService: OAuthGetClientsService,
    ) {}

    async execute(query: OAuthGetClientsQuery): Promise<OAuthClientResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getClientsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
