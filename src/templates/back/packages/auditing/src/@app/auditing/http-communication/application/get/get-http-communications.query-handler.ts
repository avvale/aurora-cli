import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpCommunicationResponse } from '../../domain/http-communication.response';
import { HttpCommunicationMapper } from '../../domain/http-communication.mapper';
import { GetHttpCommunicationsQuery } from './get-http-communications.query';
import { GetHttpCommunicationsService } from './get-http-communications.service';

@QueryHandler(GetHttpCommunicationsQuery)
export class GetHttpCommunicationsQueryHandler implements IQueryHandler<GetHttpCommunicationsQuery>
{
    private readonly mapper: HttpCommunicationMapper = new HttpCommunicationMapper();

    constructor(
        private readonly getHttpCommunicationsService: GetHttpCommunicationsService,
    ) {}

    async execute(query: GetHttpCommunicationsQuery): Promise<HttpCommunicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getHttpCommunicationsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}