/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission, IamUpdatePermissionsInput } from '@api/graphql';
import {
  IamGetPermissionsQuery,
  IamUpdatePermissionsCommand,
} from '@app/iam/permission';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdatePermissionsHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamUpdatePermissionsInput,
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamPermission> {
    await this.commandBus.dispatch(
      new IamUpdatePermissionsCommand(payload, queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new IamGetPermissionsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
