import { CommonCreateLangDto, CommonLangDto } from '@api/common/lang';
import { CommonCreateLangInput, CommonLang } from '@api/graphql';
import {
  CommonCreateLangCommand,
  CommonFindLangByIdQuery,
} from '@app/common/lang';
import {
  AuditingMeta,
  CoreGetLangsService,
  ICommandBus,
  IQueryBus,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateLangHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    private readonly coreGetLangsService: CoreGetLangsService,
  ) {}

  async main(
    payload: CommonCreateLangInput | CommonCreateLangDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonLang | CommonLangDto> {
    await this.commandBus.dispatch(
      new CommonCreateLangCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    // init cache langs to update langs
    await this.coreGetLangsService.init();

    return await this.queryBus.ask(
      new CommonFindLangByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
