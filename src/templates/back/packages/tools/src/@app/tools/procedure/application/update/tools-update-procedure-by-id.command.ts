import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class ToolsUpdateProcedureByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            type?: string;
            version?: string;
            isActive?: boolean;
            isInstalled?: boolean;
            isUpdated?: boolean;
            upScript?: string;
            downScript?: string;
            sort?: number;
            executedAt?: string;
            checkedAt?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
