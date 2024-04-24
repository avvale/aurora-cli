import { WhatsappUpdatedTimelineEvent } from './whatsapp-updated-timeline.event';

export class WhatsappUpdatedTimelinesEvent
{
    constructor(
        public readonly timelines: WhatsappUpdatedTimelineEvent[],
    ) {}
}
