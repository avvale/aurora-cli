import { IamRole } from '@api/graphql';
import { IamDeleteRoleByIdCommand, IamFindRoleByIdQuery } from '@app/iam/role';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamDeleteRoleByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamRole> {
    const role = await this.queryBus.ask(
      new IamFindRoleByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!role) {
      throw new NotFoundException(`IamRole with id: ${id}, not found`);
    }

    await this.commandBus.dispatch(
      new IamDeleteRoleByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return role;
  }
}
