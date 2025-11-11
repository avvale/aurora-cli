import { ToolsDeletedKeyValueEvent } from '@app/tools/key-value';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedKeyValuesEvent {
    constructor(
        public readonly event: {
            payload: ToolsDeletedKeyValueEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
