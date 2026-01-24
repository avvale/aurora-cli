/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamPermissionRole } from '@api/graphql';
import {
  IamDeletePermissionRoleByIdCommand,
  IamFindPermissionRoleByIdQuery,
} from '@app/iam/permission-role';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamDeletePermissionRoleByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    permissionId: string,
    roleId: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamPermissionRole> {
    const permissionRole = await this.queryBus.ask(
      new IamFindPermissionRoleByIdQuery(permissionId, roleId, constraint, {
        timezone,
      }),
    );

    if (!permissionRole) {
      throw new NotFoundException(
        `IamPermissionRole with permissionId: ${permissionId} roleId: ${roleId}, not found`,
      );
    }

    await this.commandBus.dispatch(
      new IamDeletePermissionRoleByIdCommand(permissionId, roleId, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return permissionRole;
  }
}
