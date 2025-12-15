import {
    toolsMockWebhookLogData,
    ToolsWebhookLog,
} from '@app/tools/webhook-log';
import {
    ToolsWebhookLogBodyRequest,
    ToolsWebhookLogCreatedAt,
    ToolsWebhookLogDeletedAt,
    ToolsWebhookLogHeaderRequest,
    ToolsWebhookLogId,
    ToolsWebhookLogRowId,
    ToolsWebhookLogUpdatedAt,
    ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class ToolsMockWebhookLogSeeder extends MockSeeder<ToolsWebhookLog> {
    public collectionSource: ToolsWebhookLog[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const webhookLog of _.orderBy(toolsMockWebhookLogData, ['id'])) {
            this.collectionSource.push(
                ToolsWebhookLog.register(
                    new ToolsWebhookLogId(webhookLog.id),
                    new ToolsWebhookLogRowId(webhookLog.rowId),
                    new ToolsWebhookLogUrl(webhookLog.url),
                    new ToolsWebhookLogHeaderRequest(webhookLog.headerRequest),
                    new ToolsWebhookLogBodyRequest(webhookLog.bodyRequest),
                    new ToolsWebhookLogCreatedAt({ currentTimestamp: true }),
                    new ToolsWebhookLogUpdatedAt({ currentTimestamp: true }),
                    new ToolsWebhookLogDeletedAt(null),
                ),
            );
        }
    }
}
