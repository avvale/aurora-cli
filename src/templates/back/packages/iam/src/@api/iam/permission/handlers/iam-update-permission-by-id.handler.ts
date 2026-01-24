/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';
import {
  IamFindPermissionByIdQuery,
  IamUpdatePermissionByIdCommand,
} from '@app/iam/permission';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamUpdatePermissionByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamUpdatePermissionByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamPermission> {
    const permission = await this.queryBus.ask(
      new IamFindPermissionByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (!permission) {
      throw new NotFoundException(
        `IamPermission with id: ${payload.id}, not found`,
      );
    }

    const dataToUpdate = diff(payload, permission);

    await this.commandBus.dispatch(
      new IamUpdatePermissionByIdCommand(
        {
          ...dataToUpdate,
          id: payload.id,
        },
        constraint,
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    return await this.queryBus.ask(
      new IamFindPermissionByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
