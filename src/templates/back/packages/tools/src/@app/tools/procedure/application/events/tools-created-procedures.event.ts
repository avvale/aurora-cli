import { ToolsCreatedProcedureEvent } from '@app/tools/procedure';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedProceduresEvent {
    constructor(
        public readonly event: {
            payload: ToolsCreatedProcedureEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
