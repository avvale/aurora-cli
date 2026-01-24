import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  CommonCreateAdministrativeAreasLevel3Command,
  commonMockAdministrativeAreaLevel3Data,
} from '@app/common/administrative-area-level-3';

@Injectable()
export class CommonAdministrativeAreaLevel3Seeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateAdministrativeAreasLevel3Command(
        commonMockAdministrativeAreaLevel3Data,
        {
          timezone: process.env.TZ,
        },
      ),
    );

    return true;
  }
}
