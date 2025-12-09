import {
    ToolsIWebhookRepository,
    toolsMockWebhookData,
    ToolsWebhook,
} from '@app/tools/webhook';
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
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsMockWebhookRepository
    extends MockRepository<ToolsWebhook>
    implements ToolsIWebhookRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'ToolsWebhook';
    public collectionSource: ToolsWebhook[];

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

        for (const itemCollection of <any[]>toolsMockWebhookData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                ToolsWebhook.register(
                    new ToolsWebhookId(itemCollection.id),
                    new ToolsWebhookRowId(itemCollection.rowId),
                    new ToolsWebhookName(itemCollection.name),
                    new ToolsWebhookService(itemCollection.service),
                    new ToolsWebhookEndpoint(itemCollection.endpoint),
                    new ToolsWebhookExternalId(itemCollection.externalId),
                    new ToolsWebhookEvents(itemCollection.events),
                    new ToolsWebhookSecret(itemCollection.secret),
                    new ToolsWebhookMeta(itemCollection.meta),
                    new ToolsWebhookCreatedAt(itemCollection.createdAt),
                    new ToolsWebhookUpdatedAt(itemCollection.updatedAt),
                    new ToolsWebhookDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
