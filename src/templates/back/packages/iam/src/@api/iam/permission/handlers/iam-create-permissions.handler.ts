/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamCreatePermissionInput } from '@api/graphql';
import { IamCreatePermissionsCommand } from '@app/iam/permission';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreatePermissionsHandler {
  constructor(private readonly commandBus: ICommandBus) {}

  async main(
    payload: IamCreatePermissionInput[],
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    await this.commandBus.dispatch(
      new IamCreatePermissionsCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return true;
  }
}
