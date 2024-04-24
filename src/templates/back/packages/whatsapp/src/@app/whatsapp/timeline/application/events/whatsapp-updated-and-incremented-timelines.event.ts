import { WhatsappUpdatedAndIncrementedTimelineEvent } from './whatsapp-updated-and-incremented-timeline.event';

export class WhatsappUpdatedAndIncrementedTimelinesEvent
{
    constructor(
        public readonly timelines: WhatsappUpdatedAndIncrementedTimelineEvent[],
    ) {}
}
