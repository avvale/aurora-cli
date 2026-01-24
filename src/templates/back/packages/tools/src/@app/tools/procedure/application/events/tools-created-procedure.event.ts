import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedProcedureEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        name: string;
        type: string;
        version: string;
        isActive: boolean;
        isExecuted: boolean;
        isUpdated: boolean;
        upScript: string;
        downScript: string;
        sort: number;
        hash: string;
        executedAt: string;
        checkedAt: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
