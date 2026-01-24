import { IamCreateRoleAccountInput } from '@api/graphql';
import { IamCreateRolesAccountsCommand } from '@app/iam/role-account';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateRolesAccountsHandler {
  constructor(private readonly commandBus: ICommandBus) {}

  async main(
    payload: IamCreateRoleAccountInput[],
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    await this.commandBus.dispatch(
      new IamCreateRolesAccountsCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return true;
  }
}
