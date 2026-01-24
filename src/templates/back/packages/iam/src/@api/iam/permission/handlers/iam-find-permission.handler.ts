/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission } from '@api/graphql';
import { IamFindPermissionQuery } from '@app/iam/permission';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindPermissionHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamPermission> {
    const permission = await this.queryBus.ask(
      new IamFindPermissionQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!permission) {
      throw new NotFoundException(`IamPermission not found`);
    }

    return permission;
  }
}
