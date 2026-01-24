import { WhatsappCreatedTimelineEvent } from './whatsapp-created-timeline.event';

export class WhatsappCreatedTimelinesEvent {
  constructor(public readonly timelines: WhatsappCreatedTimelineEvent[]) {}
}
