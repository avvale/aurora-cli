/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission } from '@api/graphql';
import {
  IamDeletePermissionsCommand,
  IamGetPermissionsQuery,
} from '@app/iam/permission';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeletePermissionsHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamPermission[]> {
    const permissions = await this.queryBus.ask(
      new IamGetPermissionsQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new IamDeletePermissionsCommand(queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return permissions;
  }
}
