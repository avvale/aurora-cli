import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreateMigrationsCommand {
  constructor(
    public readonly payload: {
      id: string;
      name: string;
      version: string;
      isActive: boolean;
      isExecuted: boolean;
      upScript?: string;
      downScript?: string;
      sort?: number;
      executedAt?: string;
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
