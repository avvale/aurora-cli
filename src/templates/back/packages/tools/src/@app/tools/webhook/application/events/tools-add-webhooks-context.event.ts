import {
  ToolsCreatedWebhookEvent,
  ToolsCreatedWebhooksEvent,
  ToolsDeletedWebhookEvent,
  ToolsDeletedWebhooksEvent,
  ToolsWebhook,
} from '@app/tools/webhook';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsAddWebhooksContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: ToolsWebhook[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new ToolsCreatedWebhooksEvent({
        payload: this.aggregateRoots.map(
          (webhook) =>
            new ToolsCreatedWebhookEvent({
              payload: {
                id: webhook.id.value,
                name: webhook.name.value,
                service: webhook.service.value,
                endpoint: webhook.endpoint.value,
                externalId: webhook.externalId?.value,
                events: webhook.events?.value,
                secret: webhook.secret?.value,
                meta: webhook.meta?.value,
                createdAt: webhook.createdAt?.value,
                updatedAt: webhook.updatedAt?.value,
                deletedAt: webhook.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new ToolsDeletedWebhooksEvent({
        payload: this.aggregateRoots.map(
          (webhook) =>
            new ToolsDeletedWebhookEvent({
              payload: {
                id: webhook.id.value,
                rowId: webhook.rowId.value,
                name: webhook.name.value,
                service: webhook.service.value,
                endpoint: webhook.endpoint.value,
                externalId: webhook.externalId?.value,
                events: webhook.events?.value,
                secret: webhook.secret?.value,
                meta: webhook.meta?.value,
                createdAt: webhook.createdAt?.value,
                updatedAt: webhook.updatedAt?.value,
                deletedAt: webhook.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
