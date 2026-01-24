import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamCreatePermissionsCommand } from '@app/iam/permission';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { boundedContexts, permissions } from './storage-account.seed';

@Injectable()
export class StorageAccountSeeder implements OnApplicationBootstrap {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

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
