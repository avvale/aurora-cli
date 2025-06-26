import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class ToolsUpdateKeyValuesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            key?: string;
            type?: string;
            value?: string;
            isActive?: boolean;
            description?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
