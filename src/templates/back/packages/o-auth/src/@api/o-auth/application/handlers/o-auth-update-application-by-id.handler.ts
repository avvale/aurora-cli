import {
  OAuthApplication,
  OAuthUpdateApplicationByIdInput,
} from '@api/graphql';
import {
  OAuthApplicationDto,
  OAuthUpdateApplicationByIdDto,
} from '@api/o-auth/application';
import {
  OAuthFindApplicationByIdQuery,
  OAuthUpdateApplicationByIdCommand,
} from '@app/o-auth/application';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthUpdateApplicationByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: OAuthUpdateApplicationByIdInput | OAuthUpdateApplicationByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<OAuthApplication | OAuthApplicationDto> {
    const application = await this.queryBus.ask(
      new OAuthFindApplicationByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, application);

    await this.commandBus.dispatch(
      new OAuthUpdateApplicationByIdCommand(
        {
          ...dataToUpdate,
          id: payload.id,
        },
        constraint,
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    return await this.queryBus.ask(
      new OAuthFindApplicationByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
