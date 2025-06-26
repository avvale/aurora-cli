import { ToolsCreatedKeyValueEvent } from '@app/tools/key-value';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedKeyValuesEvent
{
    constructor(
        public readonly event: {
            payload: ToolsCreatedKeyValueEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
