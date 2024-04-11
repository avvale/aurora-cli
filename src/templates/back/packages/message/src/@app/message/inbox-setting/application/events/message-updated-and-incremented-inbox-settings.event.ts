import { MessageUpdatedAndIncrementedInboxSettingEvent } from './message-updated-and-incremented-inbox-setting.event';

export class MessageUpdatedAndIncrementedInboxSettingsEvent
{
    constructor(
        public readonly inboxSettings: MessageUpdatedAndIncrementedInboxSettingEvent[],
    ) {}
}
