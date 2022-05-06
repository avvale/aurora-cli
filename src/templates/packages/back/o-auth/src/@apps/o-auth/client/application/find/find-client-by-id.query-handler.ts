import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientResponse } from '../../domain/client.response';
import { ClientMapper } from '../../domain/client.mapper';
import { ClientId } from '../../domain/value-objects';
import { FindClientByIdQuery } from './find-client-by-id.query';
import { FindClientByIdService } from './find-client-by-id.service';

@QueryHandler(FindClientByIdQuery)
export class FindClientByIdQueryHandler implements IQueryHandler<FindClientByIdQuery>
{
    private readonly mapper: ClientMapper = new ClientMapper();

    constructor(
        private readonly findClientByIdService: FindClientByIdService,
    ) {}

    async execute(query: FindClientByIdQuery): Promise<ClientResponse>
    {
        const client = await this.findClientByIdService.main(
            new ClientId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(client);
    }
}