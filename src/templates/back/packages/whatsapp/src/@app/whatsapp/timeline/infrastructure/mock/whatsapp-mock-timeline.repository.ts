import { WhatsappITimelineRepository, whatsappMockTimelineData, WhatsappTimeline } from '@app/whatsapp/timeline';
import {
    WhatsappTimelineAccounts,
    WhatsappTimelineCreatedAt,
    WhatsappTimelineDeletedAt,
    WhatsappTimelineId,
    WhatsappTimelineUpdatedAt,
    WhatsappTimelineWabaContactId,
    WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappMockTimelineRepository extends MockRepository<WhatsappTimeline> implements WhatsappITimelineRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'WhatsappTimeline';
    public collectionSource: WhatsappTimeline[];

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>whatsappMockTimelineData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(WhatsappTimeline.register(
                new WhatsappTimelineId(itemCollection.id),
                new WhatsappTimelineAccounts(itemCollection.accounts),
                new WhatsappTimelineWabaPhoneNumberId(itemCollection.wabaPhoneNumberId),
                new WhatsappTimelineWabaContactId(itemCollection.wabaContactId),
                new WhatsappTimelineCreatedAt(itemCollection.createdAt),
                new WhatsappTimelineUpdatedAt(itemCollection.updatedAt),
                new WhatsappTimelineDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
