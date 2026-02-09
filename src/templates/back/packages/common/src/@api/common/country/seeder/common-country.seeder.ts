// ignored file
/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import { countries } from '@app/common/common.seed';
import { CommonCreateCountriesCommand } from '@app/common/country';

@Injectable()
export class CommonCountrySeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateCountriesCommand(countries, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
