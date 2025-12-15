import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class ToolsDeleteWebhookLogsCommand {
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
