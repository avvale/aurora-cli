import { MessageUpdatedInboxSettingEvent } from './message-updated-inbox-setting.event';

export class MessageUpdatedInboxSettingsEvent
{
    constructor(
        public readonly inboxSettings: MessageUpdatedInboxSettingEvent[],
    ) {}
}
