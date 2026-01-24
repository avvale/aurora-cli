import { OAuthApplicationClient } from '@api/graphql';
import { OAuthApplicationClientDto } from '@api/o-auth/application-client';
import { OAuthFindApplicationClientQuery } from '@app/o-auth/application-client';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindApplicationClientHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<OAuthApplicationClient | OAuthApplicationClientDto> {
    return await this.queryBus.ask(
      new OAuthFindApplicationClientQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
