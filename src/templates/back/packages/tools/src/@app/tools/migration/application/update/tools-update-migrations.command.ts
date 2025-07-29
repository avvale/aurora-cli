import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class ToolsUpdateMigrationsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
            version?: string;
            isActive?: boolean;
            isExecuted?: boolean;
            upScript?: string;
            downScript?: string;
            sort?: number;
            executedAt?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
