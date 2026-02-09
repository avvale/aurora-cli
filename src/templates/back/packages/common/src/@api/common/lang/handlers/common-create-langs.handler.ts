/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonCreateLangInput } from '@api/graphql';
import { CommonCreateLangsCommand } from '@app/common/lang';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateLangsHandler {
  constructor(private readonly commandBus: ICommandBus) {}

  async main(
    payload: CommonCreateLangInput[],
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateLangsCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return true;
  }
}
