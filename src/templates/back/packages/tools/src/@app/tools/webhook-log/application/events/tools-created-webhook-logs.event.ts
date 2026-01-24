import { ToolsCreatedWebhookLogEvent } from '@app/tools/webhook-log';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedWebhookLogsEvent {
  constructor(
    public readonly event: {
      payload: ToolsCreatedWebhookLogEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
