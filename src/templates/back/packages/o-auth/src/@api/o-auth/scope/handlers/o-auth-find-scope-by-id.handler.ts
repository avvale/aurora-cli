import { OAuthScope } from '@api/graphql';
import { OAuthScopeDto } from '@api/o-auth/scope';
import { OAuthFindScopeByIdQuery } from '@app/o-auth/scope';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindScopeByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<OAuthScope | OAuthScopeDto> {
    return await this.queryBus.ask(
      new OAuthFindScopeByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
