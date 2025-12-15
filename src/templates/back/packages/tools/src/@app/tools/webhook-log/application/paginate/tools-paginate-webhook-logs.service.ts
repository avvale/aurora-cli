import {
    ToolsIWebhookLogRepository,
    ToolsWebhookLog,
} from '@app/tools/webhook-log';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsPaginateWebhookLogsService {
    constructor(private readonly repository: ToolsIWebhookLogRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<ToolsWebhookLog>> {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
