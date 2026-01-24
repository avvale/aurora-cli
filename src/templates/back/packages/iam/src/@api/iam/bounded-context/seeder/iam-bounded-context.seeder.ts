/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  IamCreateBoundedContextsCommand,
  iamMockBoundedContextData,
} from '@app/iam/bounded-context';

@Injectable()
export class IamBoundedContextSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new IamCreateBoundedContextsCommand(iamMockBoundedContextData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
