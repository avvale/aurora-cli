import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  CommonCreateCountriesCommand,
  commonMockCountryData,
} from '@app/common/country';

@Injectable()
export class CommonCountrySeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateCountriesCommand(commonMockCountryData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
