import { CQMetadata } from '@aurorajs.dev/core';

export class ToolsCreateWebhooksCommand {
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            service: string;
            endpoint: string;
            externalId?: string;
            events?: string[];
            secret?: string;
            meta?: any;
        }[],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
