import { MessageCreatedInboxSettingEvent } from '@app/message/inbox-setting';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageCreatedInboxSettingsEvent {
  constructor(
    public readonly event: {
      payload: MessageCreatedInboxSettingEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
