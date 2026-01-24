import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';
import { OAuthClientDto, OAuthUpdateClientByIdDto } from '@api/o-auth/client';
import {
  OAuthFindClientByIdQuery,
  OAuthUpdateClientByIdCommand,
} from '@app/o-auth/client';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthUpdateClientByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: OAuthUpdateClientByIdInput | OAuthUpdateClientByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<OAuthClient | OAuthClientDto> {
    const client = await this.queryBus.ask(
      new OAuthFindClientByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, client);

    await this.commandBus.dispatch(
      new OAuthUpdateClientByIdCommand(
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
      new OAuthFindClientByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
