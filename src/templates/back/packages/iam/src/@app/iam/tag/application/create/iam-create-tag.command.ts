import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateTagCommand {
  constructor(
    public readonly payload: {
      id: string;
      name: string;
    },
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
