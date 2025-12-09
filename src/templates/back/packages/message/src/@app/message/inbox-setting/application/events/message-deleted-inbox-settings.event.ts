import { MessageDeletedInboxSettingEvent } from '@app/message/inbox-setting';
import { CQMetadata } from '@aurorajs.dev/core';

export class MessageDeletedInboxSettingsEvent {
    constructor(
        public readonly event: {
            payload: MessageDeletedInboxSettingEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
