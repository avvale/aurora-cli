import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappCreateTimelineCommand {
  constructor(
    public readonly payload: {
      id: string;
      accounts?: string[];
      wabaPhoneNumberId: string;
      wabaContactId: string;
    },
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
