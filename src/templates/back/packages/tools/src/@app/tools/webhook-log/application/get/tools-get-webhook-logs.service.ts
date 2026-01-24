import {
  ToolsIWebhookLogRepository,
  ToolsWebhookLog,
} from '@app/tools/webhook-log';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetWebhookLogsService {
  constructor(private readonly repository: ToolsIWebhookLogRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<ToolsWebhookLog[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
