// ignored file
/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import { CommonCreateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1';
import { administrativeAreasLevel1 } from '@app/common/common.seed';

@Injectable()
export class CommonAdministrativeAreaLevel1Seeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateAdministrativeAreasLevel1Command(
        administrativeAreasLevel1,
        {
          timezone: process.env.TZ,
        },
      ),
    );

    return true;
  }
}
