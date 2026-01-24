// ignored file
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
// import { IamCreatePermissionsCommand } from '@app/iam/permission';
// import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';

@Injectable()
export class AuditingSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    // await this.commandBus.dispatch(new IamCreateBoundedContextsCommand(boundedContexts, { timezone: process.env.TZ }));
    // await this.commandBus.dispatch(new IamCreatePermissionsCommand(permissions, { timezone: process.env.TZ }));

    return true;
  }
}
