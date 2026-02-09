/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonCreateLangInput, CommonLang } from '@api/graphql';
import {
  CommonCreateLangCommand,
  CommonFindLangByIdQuery,
} from '@app/common/lang';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateLangHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: CommonCreateLangInput,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonLang> {
    await this.commandBus.dispatch(
      new CommonCreateLangCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new CommonFindLangByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
