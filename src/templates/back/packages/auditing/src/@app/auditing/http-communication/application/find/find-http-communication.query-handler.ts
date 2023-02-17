import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpCommunicationResponse } from '../../domain/http-communication.response';
import { HttpCommunicationMapper } from '../../domain/http-communication.mapper';
import { FindHttpCommunicationQuery } from './find-http-communication.query';
import { FindHttpCommunicationService } from './find-http-communication.service';

@QueryHandler(FindHttpCommunicationQuery)
export class FindHttpCommunicationQueryHandler implements IQueryHandler<FindHttpCommunicationQuery>
{
    private readonly mapper: HttpCommunicationMapper = new HttpCommunicationMapper();

    constructor(
        private readonly findHttpCommunicationService: FindHttpCommunicationService,
    ) {}

    async execute(query: FindHttpCommunicationQuery): Promise<HttpCommunicationResponse>
    {
        const httpCommunication = await this.findHttpCommunicationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(httpCommunication);
    }
}