/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonLang } from '@api/graphql';
import {
  CommonDeleteLangByIdCommand,
  CommonFindLangByIdQuery,
} from '@app/common/lang';
import {
  AuditingMeta,
  CoreGetLangsService,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonDeleteLangByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    private readonly coreGetLangsService: CoreGetLangsService,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonLang> {
    const lang = await this.queryBus.ask(
      new CommonFindLangByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!lang) {
      throw new NotFoundException(`CommonLang with id: ${id}, not found`);
    }

    await this.commandBus.dispatch(
      new CommonDeleteLangByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    // init cache langs to update langs
    await this.coreGetLangsService.init();

    return lang;
  }
}
