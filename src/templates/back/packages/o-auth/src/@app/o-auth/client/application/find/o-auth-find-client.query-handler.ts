import {
  OAuthClientMapper,
  OAuthClientResponse,
  OAuthFindClientQuery,
} from '@app/o-auth/client';
import { OAuthFindClientService } from '@app/o-auth/client/application/find/o-auth-find-client.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindClientQuery)
export class OAuthFindClientQueryHandler
  implements IQueryHandler<OAuthFindClientQuery>
{
  private readonly mapper: OAuthClientMapper = new OAuthClientMapper();

  constructor(private readonly findClientService: OAuthFindClientService) {}

  async execute(query: OAuthFindClientQuery): Promise<OAuthClientResponse> {
    const client = await this.findClientService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(client);
  }
}
