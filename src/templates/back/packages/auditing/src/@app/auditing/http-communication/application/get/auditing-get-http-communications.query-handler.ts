import {
  AuditingGetHttpCommunicationsQuery,
  AuditingHttpCommunication,
  AuditingHttpCommunicationMapper,
  AuditingHttpCommunicationResponse,
} from '@app/auditing/http-communication';
import { AuditingGetHttpCommunicationsService } from '@app/auditing/http-communication/application/get/auditing-get-http-communications.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingGetHttpCommunicationsQuery)
export class AuditingGetHttpCommunicationsQueryHandler
  implements IQueryHandler<AuditingGetHttpCommunicationsQuery>
{
  private readonly mapper: AuditingHttpCommunicationMapper =
    new AuditingHttpCommunicationMapper();

  constructor(
    private readonly getHttpCommunicationsService: AuditingGetHttpCommunicationsService,
  ) {}

  async execute(
    query: AuditingGetHttpCommunicationsQuery,
  ): Promise<AuditingHttpCommunicationResponse[] | LiteralObject[]> {
    const models = await this.getHttpCommunicationsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(
      models as AuditingHttpCommunication[],
    );
  }
}
