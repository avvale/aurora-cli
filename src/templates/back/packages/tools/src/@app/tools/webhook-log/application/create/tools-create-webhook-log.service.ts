import {
  ToolsIWebhookLogRepository,
  ToolsWebhookLog,
} from '@app/tools/webhook-log';
import {
  ToolsWebhookLogBodyRequest,
  ToolsWebhookLogCreatedAt,
  ToolsWebhookLogHeaderRequest,
  ToolsWebhookLogId,
  ToolsWebhookLogUpdatedAt,
  ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsCreateWebhookLogService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ToolsIWebhookLogRepository,
  ) {}

  async main(
    payload: {
      id: ToolsWebhookLogId;
      url: ToolsWebhookLogUrl;
      headerRequest: ToolsWebhookLogHeaderRequest;
      bodyRequest: ToolsWebhookLogBodyRequest;
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const webhookLog = ToolsWebhookLog.register(
      payload.id,
      undefined, // rowId
      payload.url,
      payload.headerRequest,
      payload.bodyRequest,
      new ToolsWebhookLogCreatedAt({ currentTimestamp: true }),
      new ToolsWebhookLogUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    await this.repository.create(webhookLog, {
      createOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const webhookLogRegister = this.publisher.mergeObjectContext(webhookLog);

    webhookLogRegister.created({
      payload: webhookLog,
      cQMetadata,
    }); // apply event to model events
    webhookLogRegister.commit(); // commit all events of model
  }
}
