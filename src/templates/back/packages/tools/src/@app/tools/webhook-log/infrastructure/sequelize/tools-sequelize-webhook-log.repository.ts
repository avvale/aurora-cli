import {
    ToolsIWebhookLogRepository,
    ToolsWebhookLog,
    ToolsWebhookLogMapper,
    ToolsWebhookLogModel,
} from '@app/tools/webhook-log';
import {
    AuditingRunner,
    ICriteria,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ToolsSequelizeWebhookLogRepository
    extends SequelizeRepository<ToolsWebhookLog, ToolsWebhookLogModel>
    implements ToolsIWebhookLogRepository
{
    public readonly aggregateName: string = 'ToolsWebhookLog';
    public readonly mapper: ToolsWebhookLogMapper = new ToolsWebhookLogMapper();

    constructor(
        @InjectModel(ToolsWebhookLogModel)
        public readonly repository: typeof ToolsWebhookLogModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }
}
