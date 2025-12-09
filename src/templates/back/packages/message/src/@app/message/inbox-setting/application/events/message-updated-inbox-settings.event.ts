import { MessageUpdatedInboxSettingEvent } from '@app/message/inbox-setting';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageUpdatedInboxSettingsEvent {
    constructor(
        public readonly event: {
            payload: MessageUpdatedInboxSettingEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
