import { MessageCreatedInboxSettingEvent } from './message-created-inbox-setting.event';

export class MessageCreatedInboxSettingsEvent
{
    constructor(
        public readonly inboxSettings: MessageCreatedInboxSettingEvent[],
    ) {}
}
