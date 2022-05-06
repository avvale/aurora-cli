import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientResponse } from '../../domain/client.response';
import { ClientMapper } from '../../domain/client.mapper';
import { FindClientQuery } from './find-client.query';
import { FindClientService } from './find-client.service';

@QueryHandler(FindClientQuery)
export class FindClientQueryHandler implements IQueryHandler<FindClientQuery>
{
    private readonly mapper: ClientMapper = new ClientMapper();

    constructor(
        private readonly findClientService: FindClientService,
    ) {}

    async execute(query: FindClientQuery): Promise<ClientResponse>
    {
        const client = await this.findClientService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(client);
    }
}