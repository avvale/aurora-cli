/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission } from '@api/graphql';
import { IamFindPermissionByIdQuery } from '@app/iam/permission';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindPermissionByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamPermission> {
    const permission = await this.queryBus.ask(
      new IamFindPermissionByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!permission) {
      throw new NotFoundException(`IamPermission with id: ${id}, not found`);
    }

    return permission;
  }
}
