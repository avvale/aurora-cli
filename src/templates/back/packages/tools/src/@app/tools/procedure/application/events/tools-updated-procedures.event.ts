import { ToolsUpdatedProcedureEvent } from '@app/tools/procedure';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsUpdatedProceduresEvent {
    constructor(
        public readonly event: {
            payload: ToolsUpdatedProcedureEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
