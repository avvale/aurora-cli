import {
  MessageInboxSetting,
  MessageUpdateInboxSettingsInput,
} from '@api/graphql';
import {
  MessageInboxSettingDto,
  MessageUpdateInboxSettingsDto,
} from '@api/message/inbox-setting';
import {
  MessageGetInboxSettingsQuery,
  MessageUpdateInboxSettingsCommand,
} from '@app/message/inbox-setting';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpdateInboxSettingsHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: MessageUpdateInboxSettingsInput | MessageUpdateInboxSettingsDto,
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<MessageInboxSetting | MessageInboxSettingDto> {
    await this.commandBus.dispatch(
      new MessageUpdateInboxSettingsCommand(
        payload,
        queryStatement,
        constraint,
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    return await this.queryBus.ask(
      new MessageGetInboxSettingsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
