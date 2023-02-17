import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpCommunicationResponse } from '../../domain/http-communication.response';
import { HttpCommunicationMapper } from '../../domain/http-communication.mapper';
import { HttpCommunicationId } from '../../domain/value-objects';
import { FindHttpCommunicationByIdQuery } from './find-http-communication-by-id.query';
import { FindHttpCommunicationByIdService } from './find-http-communication-by-id.service';

@QueryHandler(FindHttpCommunicationByIdQuery)
export class FindHttpCommunicationByIdQueryHandler implements IQueryHandler<FindHttpCommunicationByIdQuery>
{
    private readonly mapper: HttpCommunicationMapper = new HttpCommunicationMapper();

    constructor(
        private readonly findHttpCommunicationByIdService: FindHttpCommunicationByIdService,
    ) {}

    async execute(query: FindHttpCommunicationByIdQuery): Promise<HttpCommunicationResponse>
    {
        const httpCommunication = await this.findHttpCommunicationByIdService.main(
            new HttpCommunicationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(httpCommunication);
    }
}