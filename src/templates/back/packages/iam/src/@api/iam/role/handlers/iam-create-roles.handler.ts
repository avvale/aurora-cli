import { IamCreateRoleInput } from '@api/graphql';
import { IamCreateRolesCommand } from '@app/iam/role';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateRolesHandler {
  constructor(private readonly commandBus: ICommandBus) {}

  async main(
    payload: IamCreateRoleInput[],
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    await this.commandBus.dispatch(
      new IamCreateRolesCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return true;
  }
}
