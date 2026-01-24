import { IamUser } from '@api/graphql';
import { IamUserDto } from '@api/iam/user';
import { IamFindUserByIdQuery } from '@app/iam/user';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindUserByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamUser | IamUserDto> {
    return await this.queryBus.ask(
      new IamFindUserByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
