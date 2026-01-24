import { ToolsIWebhookRepository, ToolsWebhook } from '@app/tools/webhook';
import { ToolsWebhookId } from '@app/tools/webhook/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindWebhookByIdService {
  constructor(private readonly repository: ToolsIWebhookRepository) {}

  async main(
    id: ToolsWebhookId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<ToolsWebhook> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
