import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  ToolsCreateKeyValuesCommand,
  toolsMockKeyValueData,
} from '@app/tools/key-value';

@Injectable()
export class ToolsKeyValueSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new ToolsCreateKeyValuesCommand(toolsMockKeyValueData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
