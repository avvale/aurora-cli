import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateAttachmentFamiliesCommand {
  constructor(
    public readonly payload: {
      id: string;
      resourceId: string;
      code: string;
      name: string;
      width?: number;
      height?: number;
      fitType?: string;
      quality?: number;
      sizes?: any;
      format?: string;
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
