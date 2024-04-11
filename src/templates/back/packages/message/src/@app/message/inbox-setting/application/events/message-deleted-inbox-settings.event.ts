import { MessageDeletedInboxSettingEvent } from './message-deleted-inbox-setting.event';

export class MessageDeletedInboxSettingsEvent
{
    constructor(
        public readonly inboxSettings: MessageDeletedInboxSettingEvent[],
    ) {}
}
