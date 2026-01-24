import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';
import { IamFindRoleByIdQuery, IamUpdateRoleByIdCommand } from '@app/iam/role';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamUpdateRoleByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: IamUpdateRoleByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamRole> {
    const role = await this.queryBus.ask(
      new IamFindRoleByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (!role) {
      throw new NotFoundException(`IamRole with id: ${payload.id}, not found`);
    }

    const dataToUpdate = diff(payload, role);

    await this.commandBus.dispatch(
      new IamUpdateRoleByIdCommand(
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
      new IamFindRoleByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
