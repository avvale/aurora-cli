import { OAuthScope } from '@api/graphql';
import { OAuthScopeDto } from '@api/o-auth/scope';
import {
  OAuthDeleteScopeByIdCommand,
  OAuthFindScopeByIdQuery,
} from '@app/o-auth/scope';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteScopeByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<OAuthScope | OAuthScopeDto> {
    const scope = await this.queryBus.ask(
      new OAuthFindScopeByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new OAuthDeleteScopeByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return scope;
  }
}
