import {
    ToolsIWebhookLogRepository,
    ToolsWebhookLog,
} from '@app/tools/webhook-log';
import { ToolsWebhookLogId } from '@app/tools/webhook-log/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindWebhookLogByIdService {
    constructor(private readonly repository: ToolsIWebhookLogRepository) {}

    async main(
        id: ToolsWebhookLogId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<ToolsWebhookLog> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
