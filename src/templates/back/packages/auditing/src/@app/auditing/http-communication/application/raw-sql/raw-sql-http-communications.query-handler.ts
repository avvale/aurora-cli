import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpCommunicationResponse } from '../../domain/http-communication.response';
import { HttpCommunicationMapper } from '../../domain/http-communication.mapper';
import { RawSQLHttpCommunicationsQuery } from './raw-sql-http-communications.query';
import { RawSQLHttpCommunicationsService } from './raw-sql-http-communications.service';

@QueryHandler(RawSQLHttpCommunicationsQuery)
export class RawSQLHttpCommunicationsQueryHandler implements IQueryHandler<RawSQLHttpCommunicationsQuery>
{
    private readonly mapper: HttpCommunicationMapper = new HttpCommunicationMapper();

    constructor(
        private readonly rawSQLHttpCommunicationsService: RawSQLHttpCommunicationsService,
    ) {}

    async execute(query: RawSQLHttpCommunicationsQuery): Promise<HttpCommunicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLHttpCommunicationsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}