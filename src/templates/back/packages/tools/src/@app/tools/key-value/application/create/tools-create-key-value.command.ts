import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreateKeyValueCommand {
    constructor(
        public readonly payload: {
            id: string;
            key: string;
            type: string;
            value: string;
            isActive: boolean;
            description?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
