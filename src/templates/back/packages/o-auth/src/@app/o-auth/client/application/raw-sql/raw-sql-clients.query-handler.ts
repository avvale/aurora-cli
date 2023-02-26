import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientResponse } from '../../domain/client.response';
import { ClientMapper } from '../../domain/client.mapper';
import { RawSQLClientsQuery } from './raw-sql-clients.query';
import { RawSQLClientsService } from './raw-sql-clients.service';

@QueryHandler(RawSQLClientsQuery)
export class RawSQLClientsQueryHandler implements IQueryHandler<RawSQLClientsQuery>
{
    private readonly mapper: ClientMapper = new ClientMapper();

    constructor(
        private readonly rawSQLClientsService: RawSQLClientsService,
    ) {}

    async execute(query: RawSQLClientsQuery): Promise<ClientResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLClientsService.main(query.rawSQL, query.cQMetadata));
    }
}