import {
  ToolsIWebhookLogRepository,
  ToolsWebhookLog,
} from '@app/tools/webhook-log';
import {
  ToolsWebhookLogBodyRequest,
  ToolsWebhookLogHeaderRequest,
  ToolsWebhookLogId,
  ToolsWebhookLogUpdatedAt,
  ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsUpdateWebhookLogByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ToolsIWebhookLogRepository,
  ) {}

  async main(
    payload: {
      id: ToolsWebhookLogId;
      url?: ToolsWebhookLogUrl;
      headerRequest?: ToolsWebhookLogHeaderRequest;
      bodyRequest?: ToolsWebhookLogBodyRequest;
    },
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const webhookLog = ToolsWebhookLog.register(
      payload.id,
      undefined, // rowId
      payload.url,
      payload.headerRequest,
      payload.bodyRequest,
      null, // createdAt
      new ToolsWebhookLogUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update by id
    await this.repository.updateById(webhookLog, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const webhookLogRegister = this.publisher.mergeObjectContext(webhookLog);

    webhookLogRegister.updated({
      payload: webhookLog,
      cQMetadata,
    }); // apply event to model events
    webhookLogRegister.commit(); // commit all events of model
  }
}
