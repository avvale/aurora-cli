/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonLang } from '@api/graphql';
import { CommonFindLangByIdQuery } from '@app/common/lang';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonFindLangByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonLang> {
    const lang = await this.queryBus.ask(
      new CommonFindLangByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!lang) {
      throw new NotFoundException(`CommonLang with id: ${id}, not found`);
    }

    return lang;
  }
}
