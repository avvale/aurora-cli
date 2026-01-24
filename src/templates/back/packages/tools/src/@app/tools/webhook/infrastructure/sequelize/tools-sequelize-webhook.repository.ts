import {
  ToolsIWebhookRepository,
  ToolsWebhook,
  ToolsWebhookMapper,
  ToolsWebhookModel,
} from '@app/tools/webhook';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ToolsSequelizeWebhookRepository
  extends SequelizeRepository<ToolsWebhook, ToolsWebhookModel>
  implements ToolsIWebhookRepository
{
  public readonly aggregateName: string = 'ToolsWebhook';
  public readonly mapper: ToolsWebhookMapper = new ToolsWebhookMapper();

  constructor(
    @InjectModel(ToolsWebhookModel)
    public readonly repository: typeof ToolsWebhookModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
