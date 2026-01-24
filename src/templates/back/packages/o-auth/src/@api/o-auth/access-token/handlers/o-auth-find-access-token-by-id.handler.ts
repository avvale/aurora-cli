import { OAuthAccessToken } from '@api/graphql';
import { OAuthAccessTokenDto } from '@api/o-auth/access-token';
import { OAuthFindAccessTokenByIdQuery } from '@app/o-auth/access-token';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindAccessTokenByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<OAuthAccessToken | OAuthAccessTokenDto> {
    return await this.queryBus.ask(
      new OAuthFindAccessTokenByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
