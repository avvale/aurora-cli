import { ToolsCreatedWebhookEvent } from '@app/tools/webhook';
import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreatedWebhooksEvent {
    constructor(
        public readonly event: {
            payload: ToolsCreatedWebhookEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
