import { OAuthApplication, OAuthCreateApplicationInput } from '@api/graphql';
import {
  OAuthApplicationDto,
  OAuthCreateApplicationDto,
} from '@api/o-auth/application';
import {
  OAuthCreateApplicationCommand,
  OAuthFindApplicationByIdQuery,
} from '@app/o-auth/application';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthCreateApplicationHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: OAuthCreateApplicationInput | OAuthCreateApplicationDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<OAuthApplication | OAuthApplicationDto> {
    await this.commandBus.dispatch(
      new OAuthCreateApplicationCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new OAuthFindApplicationByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
