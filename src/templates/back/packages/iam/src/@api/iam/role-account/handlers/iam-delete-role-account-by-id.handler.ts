import { IamRoleAccount } from '@api/graphql';
import {
  IamDeleteRoleAccountByIdCommand,
  IamFindRoleAccountByIdQuery,
} from '@app/iam/role-account';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamDeleteRoleAccountByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    roleId: string,
    accountId: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamRoleAccount> {
    const roleAccount = await this.queryBus.ask(
      new IamFindRoleAccountByIdQuery(roleId, accountId, constraint, {
        timezone,
      }),
    );

    if (!roleAccount) {
      throw new NotFoundException(
        `IamRoleAccount with roleId: ${roleId} accountId: ${accountId}, not found`,
      );
    }

    await this.commandBus.dispatch(
      new IamDeleteRoleAccountByIdCommand(roleId, accountId, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return roleAccount;
  }
}
