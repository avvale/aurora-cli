import { IamCreateRoleAccountInput, IamRoleAccount } from '@api/graphql';
import {
  IamCreateRoleAccountCommand,
  IamFindRoleAccountByIdQuery,
} from '@app/iam/role-account';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateRoleAccountHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamCreateRoleAccountInput,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamRoleAccount> {
    await this.commandBus.dispatch(
      new IamCreateRoleAccountCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new IamFindRoleAccountByIdQuery(
        payload.roleId,
        payload.accountId,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
