/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission } from '@api/graphql';
import { IamGetPermissionsQuery } from '@app/iam/permission';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamGetPermissionsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamPermission[]> {
    return await this.queryBus.ask(
      new IamGetPermissionsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
