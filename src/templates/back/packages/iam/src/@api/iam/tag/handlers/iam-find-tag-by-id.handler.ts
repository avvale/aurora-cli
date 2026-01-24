import { IamTag } from '@api/graphql';
import { IamTagDto } from '@api/iam/tag';
import { IamFindTagByIdQuery } from '@app/iam/tag';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTagByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamTag | IamTagDto> {
    return await this.queryBus.ask(
      new IamFindTagByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
