import { ToolsDeletedProcedureEvent } from '@app/tools/procedure';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedProceduresEvent {
  constructor(
    public readonly event: {
      payload: ToolsDeletedProcedureEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
