/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//

@Injectable()
export class CommonResourceSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    return true;
  }
}
