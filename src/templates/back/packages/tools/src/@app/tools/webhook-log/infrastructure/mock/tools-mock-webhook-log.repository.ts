import {
    ToolsIWebhookLogRepository,
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
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsMockWebhookLogRepository
    extends MockRepository<ToolsWebhookLog>
    implements ToolsIWebhookLogRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'ToolsWebhookLog';
    public collectionSource: ToolsWebhookLog[];

    constructor() {
        super();
        this.createSourceMockData();
    }

    public reset(): void {
        this.createSourceMockData();
    }

    private createSourceMockData(): void {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>toolsMockWebhookLogData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                ToolsWebhookLog.register(
                    new ToolsWebhookLogId(itemCollection.id),
                    new ToolsWebhookLogRowId(itemCollection.rowId),
                    new ToolsWebhookLogUrl(itemCollection.url),
                    new ToolsWebhookLogHeaderRequest(
                        itemCollection.headerRequest,
                    ),
                    new ToolsWebhookLogBodyRequest(itemCollection.bodyRequest),
                    new ToolsWebhookLogCreatedAt(itemCollection.createdAt),
                    new ToolsWebhookLogUpdatedAt(itemCollection.updatedAt),
                    new ToolsWebhookLogDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
