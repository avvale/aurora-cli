import {
  OAuthGetScopesQuery,
  OAuthScope,
  OAuthScopeMapper,
  OAuthScopeResponse,
} from '@app/o-auth/scope';
import { OAuthGetScopesService } from '@app/o-auth/scope/application/get/o-auth-get-scopes.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetScopesQuery)
export class OAuthGetScopesQueryHandler
  implements IQueryHandler<OAuthGetScopesQuery>
{
  private readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

  constructor(private readonly getScopesService: OAuthGetScopesService) {}

  async execute(
    query: OAuthGetScopesQuery,
  ): Promise<OAuthScopeResponse[] | LiteralObject[]> {
    const models = await this.getScopesService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as OAuthScope[]);
  }
}
