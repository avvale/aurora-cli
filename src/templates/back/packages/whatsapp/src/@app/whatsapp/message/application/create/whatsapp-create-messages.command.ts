import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappCreateMessagesCommand {
  constructor(
    public readonly payload: {
      id: string;
      wabaMessageId: string;
      timelineId: string;
      conversationId?: string;
      statuses: string[];
      direction: string;
      accountId?: string;
      wabaContactId: string;
      contactName?: string;
      type: string;
      payload: any;
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
