/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonLang, CommonUpdateLangByIdInput } from '@api/graphql';
import {
  CommonFindLangByIdQuery,
  CommonUpdateLangByIdCommand,
} from '@app/common/lang';
import {
  AuditingMeta,
  CoreGetLangsService,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonUpdateLangByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    private readonly coreGetLangsService: CoreGetLangsService,
  ) {}

  async main(
    payload: CommonUpdateLangByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonLang> {
    const lang = await this.queryBus.ask(
      new CommonFindLangByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (!lang) {
      throw new NotFoundException(
        `CommonLang with id: ${payload.id}, not found`,
      );
    }

    const dataToUpdate = diff(payload, lang);

    await this.commandBus.dispatch(
      new CommonUpdateLangByIdCommand(
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

    // init cache langs to update langs
    await this.coreGetLangsService.init();

    return await this.queryBus.ask(
      new CommonFindLangByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
