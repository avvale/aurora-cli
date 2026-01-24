import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedTagEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
