import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  CommonCreateResourcesCommand,
  commonMockResourceData,
} from '@app/common/resource';

@Injectable()
export class CommonResourceSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateResourcesCommand(commonMockResourceData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
