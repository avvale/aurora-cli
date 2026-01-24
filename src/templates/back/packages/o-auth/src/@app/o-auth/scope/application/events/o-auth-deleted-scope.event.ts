import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedScopeEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        code: string;
        name: string;
        roleIds: string[];
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
