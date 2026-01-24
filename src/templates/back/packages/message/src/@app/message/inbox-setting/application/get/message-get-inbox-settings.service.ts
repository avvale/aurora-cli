import {
  MessageIInboxSettingRepository,
  MessageInboxSetting,
} from '@app/message/inbox-setting';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageGetInboxSettingsService {
  constructor(private readonly repository: MessageIInboxSettingRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<MessageInboxSetting[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
