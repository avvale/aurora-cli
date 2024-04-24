import { WhatsappDeletedTimelineEvent } from './whatsapp-deleted-timeline.event';

export class WhatsappDeletedTimelinesEvent
{
    constructor(
        public readonly timelines: WhatsappDeletedTimelineEvent[],
    ) {}
}
