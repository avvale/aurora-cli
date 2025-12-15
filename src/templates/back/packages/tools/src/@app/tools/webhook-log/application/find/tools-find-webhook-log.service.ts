import {
    ToolsIWebhookLogRepository,
    ToolsWebhookLog,
} from '@app/tools/webhook-log';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindWebhookLogService {
    constructor(private readonly repository: ToolsIWebhookLogRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<ToolsWebhookLog> {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
