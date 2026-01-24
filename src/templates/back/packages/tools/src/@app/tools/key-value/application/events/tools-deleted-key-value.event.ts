import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedKeyValueEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        key: string;
        type: string;
        value: string;
        isCached: boolean;
        isActive: boolean;
        description: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
