import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedApplicationEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        code: string;
        name: string;
        secret: string;
        isMaster: boolean;
        clientIds: string[];
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
