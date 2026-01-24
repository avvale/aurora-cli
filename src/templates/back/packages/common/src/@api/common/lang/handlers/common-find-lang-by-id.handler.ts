import { CommonLangDto } from '@api/common/lang';
import { CommonLang } from '@api/graphql';
import { CommonFindLangByIdQuery } from '@app/common/lang';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindLangByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonLang | CommonLangDto> {
    return await this.queryBus.ask(
      new CommonFindLangByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
