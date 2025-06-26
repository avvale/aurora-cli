import { ToolsUpdatedKeyValueEvent } from '@app/tools/key-value';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsUpdatedKeyValuesEvent
{
    constructor(
        public readonly event: {
            payload: ToolsUpdatedKeyValueEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
