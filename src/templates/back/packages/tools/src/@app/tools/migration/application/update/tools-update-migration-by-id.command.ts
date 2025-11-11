import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class ToolsUpdateMigrationByIdCommand {
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            version?: string;
            isActive?: boolean;
            isExecuted?: boolean;
            upScript?: string;
            downScript?: string;
            sort?: number;
            executedAt?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
