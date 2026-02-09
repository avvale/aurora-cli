/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';
import { CommonCreateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAdministrativeAreasLevel2Handler {
  constructor(private readonly commandBus: ICommandBus) {}

  async main(
    payload: CommonCreateAdministrativeAreaLevel2Input[],
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateAdministrativeAreasLevel2Command(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return true;
  }
}
