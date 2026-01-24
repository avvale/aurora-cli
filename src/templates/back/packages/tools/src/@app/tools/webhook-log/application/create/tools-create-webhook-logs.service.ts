import {
  ToolsAddWebhookLogsContextEvent,
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
export class ToolsCreateWebhookLogsService {
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
    }[],
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const webhookLogs = payload.map((webhookLog) =>
      ToolsWebhookLog.register(
        webhookLog.id,
        undefined, // rowId
        webhookLog.url,
        webhookLog.headerRequest,
        webhookLog.bodyRequest,
        new ToolsWebhookLogCreatedAt({ currentTimestamp: true }),
        new ToolsWebhookLogUpdatedAt({ currentTimestamp: true }),
        null, // deleteAt
      ),
    );

    // insert
    await this.repository.insert(webhookLogs, {
      insertOptions: cQMetadata?.repositoryOptions,
    });

    // create AddWebhookLogsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const webhookLogsRegistered = this.publisher.mergeObjectContext(
      new ToolsAddWebhookLogsContextEvent(webhookLogs, cQMetadata),
    );

    webhookLogsRegistered.created(); // apply event to model events
    webhookLogsRegistered.commit(); // commit all events of model
  }
}
