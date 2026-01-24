import { IamUser } from '@api/graphql';
import { IamUserDto } from '@api/iam/user';
import { IamDeleteUserByIdCommand, IamFindUserByIdQuery } from '@app/iam/user';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteUserByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamUser | IamUserDto> {
    const user = await this.queryBus.ask(
      new IamFindUserByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new IamDeleteUserByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return user;
  }
}
