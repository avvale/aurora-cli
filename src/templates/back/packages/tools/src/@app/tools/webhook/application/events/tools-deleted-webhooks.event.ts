import { ToolsDeletedWebhookEvent } from '@app/tools/webhook';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsDeletedWebhooksEvent {
    constructor(
        public readonly event: {
            payload: ToolsDeletedWebhookEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
