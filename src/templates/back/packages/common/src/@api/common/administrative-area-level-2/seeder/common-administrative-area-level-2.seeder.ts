// ignored file
/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import { CommonCreateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2';
import { administrativeAreasLevel2 } from '@app/common/common.seed';

@Injectable()
export class CommonAdministrativeAreaLevel2Seeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateAdministrativeAreasLevel2Command(
        administrativeAreasLevel2,
        {
          timezone: process.env.TZ,
        },
      ),
    );

    return true;
  }
}
