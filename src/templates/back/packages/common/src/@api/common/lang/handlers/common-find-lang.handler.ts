/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonLang } from '@api/graphql';
import { CommonFindLangQuery } from '@app/common/lang';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonFindLangHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonLang> {
    const lang = await this.queryBus.ask(
      new CommonFindLangQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!lang) {
      throw new NotFoundException(`CommonLang not found`);
    }

    return lang;
  }
}
