import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuditingHttpCommunicationResponse } from '../../domain/auditing-http-communication.response';
import { AuditingHttpCommunicationMapper } from '../../domain/auditing-http-communication.mapper';
import { AuditingGetHttpCommunicationsQuery } from './auditing-get-http-communications.query';
import { AuditingGetHttpCommunicationsService } from './auditing-get-http-communications.service';

@QueryHandler(AuditingGetHttpCommunicationsQuery)
export class AuditingGetHttpCommunicationsQueryHandler implements IQueryHandler<AuditingGetHttpCommunicationsQuery>
{
    private readonly mapper: AuditingHttpCommunicationMapper = new AuditingHttpCommunicationMapper();

    constructor(
        private readonly getHttpCommunicationsService: AuditingGetHttpCommunicationsService,
    ) {}

    async execute(query: AuditingGetHttpCommunicationsQuery): Promise<AuditingHttpCommunicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getHttpCommunicationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
