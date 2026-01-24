import { OAuthScope } from '@api/graphql';
import { OAuthScopeDto } from '@api/o-auth/scope';
import { OAuthGetScopesQuery } from '@app/o-auth/scope';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetScopesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<OAuthScope[] | OAuthScopeDto[]> {
    return await this.queryBus.ask(
      new OAuthGetScopesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
