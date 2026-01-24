import {
  OAuthClient,
  OAuthClientMapper,
  OAuthClientResponse,
  OAuthGetClientsQuery,
} from '@app/o-auth/client';
import { OAuthGetClientsService } from '@app/o-auth/client/application/get/o-auth-get-clients.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetClientsQuery)
export class OAuthGetClientsQueryHandler
  implements IQueryHandler<OAuthGetClientsQuery>
{
  private readonly mapper: OAuthClientMapper = new OAuthClientMapper();

  constructor(private readonly getClientsService: OAuthGetClientsService) {}

  async execute(
    query: OAuthGetClientsQuery,
  ): Promise<OAuthClientResponse[] | LiteralObject[]> {
    const models = await this.getClientsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as OAuthClient[]);
  }
}
