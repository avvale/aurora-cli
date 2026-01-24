import { IamTag } from '@api/graphql';
import { IamTagDto } from '@api/iam/tag';
import { IamDeleteTagByIdCommand, IamFindTagByIdQuery } from '@app/iam/tag';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteTagByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamTag | IamTagDto> {
    const tag = await this.queryBus.ask(
      new IamFindTagByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new IamDeleteTagByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return tag;
  }
}
