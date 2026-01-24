/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamPermissionRole } from '@api/graphql';
import { IamGetPermissionsRolesQuery } from '@app/iam/permission-role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamGetPermissionsRolesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamPermissionRole[]> {
    return await this.queryBus.ask(
      new IamGetPermissionsRolesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
