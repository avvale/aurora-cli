import { ToolsDeletedWebhookLogEvent } from '@app/tools/webhook-log';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedWebhookLogsEvent {
  constructor(
    public readonly event: {
      payload: ToolsDeletedWebhookLogEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
