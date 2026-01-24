/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  IamCreatePermissionsCommand,
  iamMockPermissionData,
} from '@app/iam/permission';

@Injectable()
export class IamPermissionSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new IamCreatePermissionsCommand(iamMockPermissionData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
