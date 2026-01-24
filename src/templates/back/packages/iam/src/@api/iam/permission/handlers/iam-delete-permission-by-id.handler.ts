/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission } from '@api/graphql';
import {
  IamDeletePermissionByIdCommand,
  IamFindPermissionByIdQuery,
} from '@app/iam/permission';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamDeletePermissionByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamPermission> {
    const permission = await this.queryBus.ask(
      new IamFindPermissionByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!permission) {
      throw new NotFoundException(`IamPermission with id: ${id}, not found`);
    }

    await this.commandBus.dispatch(
      new IamDeletePermissionByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return permission;
  }
}
