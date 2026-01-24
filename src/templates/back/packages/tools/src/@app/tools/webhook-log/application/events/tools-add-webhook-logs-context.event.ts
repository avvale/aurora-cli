import {
  ToolsCreatedWebhookLogEvent,
  ToolsCreatedWebhookLogsEvent,
  ToolsDeletedWebhookLogEvent,
  ToolsDeletedWebhookLogsEvent,
  ToolsWebhookLog,
} from '@app/tools/webhook-log';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsAddWebhookLogsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: ToolsWebhookLog[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new ToolsCreatedWebhookLogsEvent({
        payload: this.aggregateRoots.map(
          (webhookLog) =>
            new ToolsCreatedWebhookLogEvent({
              payload: {
                id: webhookLog.id.value,
                url: webhookLog.url.value,
                headerRequest: webhookLog.headerRequest?.value,
                bodyRequest: webhookLog.bodyRequest?.value,
                createdAt: webhookLog.createdAt?.value,
                updatedAt: webhookLog.updatedAt?.value,
                deletedAt: webhookLog.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new ToolsDeletedWebhookLogsEvent({
        payload: this.aggregateRoots.map(
          (webhookLog) =>
            new ToolsDeletedWebhookLogEvent({
              payload: {
                id: webhookLog.id.value,
                rowId: webhookLog.rowId.value,
                url: webhookLog.url.value,
                headerRequest: webhookLog.headerRequest?.value,
                bodyRequest: webhookLog.bodyRequest?.value,
                createdAt: webhookLog.createdAt?.value,
                updatedAt: webhookLog.updatedAt?.value,
                deletedAt: webhookLog.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
