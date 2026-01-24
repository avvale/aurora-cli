/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamCreatePermissionInput, IamPermission } from '@api/graphql';
import {
  IamCreatePermissionCommand,
  IamFindPermissionByIdQuery,
} from '@app/iam/permission';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreatePermissionHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamCreatePermissionInput,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamPermission> {
    await this.commandBus.dispatch(
      new IamCreatePermissionCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new IamFindPermissionByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
