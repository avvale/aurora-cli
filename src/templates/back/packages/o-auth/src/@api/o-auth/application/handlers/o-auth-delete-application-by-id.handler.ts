import { OAuthApplication } from '@api/graphql';
import { OAuthApplicationDto } from '@api/o-auth/application';
import {
  OAuthDeleteApplicationByIdCommand,
  OAuthFindApplicationByIdQuery,
} from '@app/o-auth/application';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteApplicationByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<OAuthApplication | OAuthApplicationDto> {
    const application = await this.queryBus.ask(
      new OAuthFindApplicationByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new OAuthDeleteApplicationByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return application;
  }
}
