import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class ToolsUpdateKeyValueByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            key?: string;
            type?: string;
            value?: string;
            isActive?: boolean;
            description?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
