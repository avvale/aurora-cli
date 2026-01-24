import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappCreateTimelinesCommand {
  constructor(
    public readonly payload: {
      id: string;
      accounts?: string[];
      wabaPhoneNumberId: string;
      wabaContactId: string;
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
