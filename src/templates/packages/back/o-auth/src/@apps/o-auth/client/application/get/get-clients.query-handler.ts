import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientResponse } from '../../domain/client.response';
import { ClientMapper } from '../../domain/client.mapper';
import { GetClientsQuery } from './get-clients.query';
import { GetClientsService } from './get-clients.service';

@QueryHandler(GetClientsQuery)
export class GetClientsQueryHandler implements IQueryHandler<GetClientsQuery>
{
    private readonly mapper: ClientMapper = new ClientMapper();

    constructor(
        private readonly getClientsService: GetClientsService,
    ) {}

    async execute(query: GetClientsQuery): Promise<ClientResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getClientsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}