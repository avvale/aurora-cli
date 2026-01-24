import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamCreatePermissionsCommand } from '@app/iam/permission';
import { boundedContexts, permissions } from '@app/message/message.seed';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class MessageSeeder implements OnApplicationBootstrap {
  constructor(private readonly commandBus: ICommandBus) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.commandBus.dispatch(
      new IamCreateBoundedContextsCommand(boundedContexts, {
        timezone: process.env.TZ,
        repositoryOptions: {
          updateOnDuplicate: ['name', 'root', 'sort', 'isActive'],
          conflictAttributes: ['id'],
        },
      }),
    );
    void this.commandBus.dispatch(
      new IamCreatePermissionsCommand(permissions, {
        timezone: process.env.TZ,
        repositoryOptions: {
          updateOnDuplicate: ['name', 'boundedContextId'],
          conflictAttributes: ['id'],
        },
      }),
    );
  }
}
