import { toolsMockWebhookData, ToolsWebhook } from '@app/tools/webhook';
import {
  ToolsWebhookCreatedAt,
  ToolsWebhookDeletedAt,
  ToolsWebhookEndpoint,
  ToolsWebhookEvents,
  ToolsWebhookExternalId,
  ToolsWebhookId,
  ToolsWebhookMeta,
  ToolsWebhookName,
  ToolsWebhookRowId,
  ToolsWebhookSecret,
  ToolsWebhookService,
  ToolsWebhookUpdatedAt,
} from '@app/tools/webhook/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class ToolsMockWebhookSeeder extends MockSeeder<ToolsWebhook> {
  public collectionSource: ToolsWebhook[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const webhook of _.orderBy(toolsMockWebhookData, ['id'])) {
      this.collectionSource.push(
        ToolsWebhook.register(
          new ToolsWebhookId(webhook.id),
          new ToolsWebhookRowId(webhook.rowId),
          new ToolsWebhookName(webhook.name),
          new ToolsWebhookService(webhook.service),
          new ToolsWebhookEndpoint(webhook.endpoint),
          new ToolsWebhookExternalId(webhook.externalId),
          new ToolsWebhookEvents(webhook.events),
          new ToolsWebhookSecret(webhook.secret),
          new ToolsWebhookMeta(webhook.meta),
          new ToolsWebhookCreatedAt({ currentTimestamp: true }),
          new ToolsWebhookUpdatedAt({ currentTimestamp: true }),
          new ToolsWebhookDeletedAt(null),
        ),
      );
    }
  }
}
