/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamPermissionRole } from '@api/graphql';
import { IamFindPermissionRoleQuery } from '@app/iam/permission-role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindPermissionRoleHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamPermissionRole> {
    const permissionRole = await this.queryBus.ask(
      new IamFindPermissionRoleQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!permissionRole) {
      throw new NotFoundException(`IamPermissionRole not found`);
    }

    return permissionRole;
  }
}
