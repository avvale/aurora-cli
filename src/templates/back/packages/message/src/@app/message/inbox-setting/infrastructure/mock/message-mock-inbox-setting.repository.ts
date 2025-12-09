import {
    MessageIInboxSettingRepository,
    MessageInboxSetting,
    messageMockInboxSettingData,
} from '@app/message/inbox-setting';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingCreatedAt,
    MessageInboxSettingDeletedAt,
    MessageInboxSettingId,
    MessageInboxSettingLastReadMessageRowId,
    MessageInboxSettingRowId,
    MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageMockInboxSettingRepository
    extends MockRepository<MessageInboxSetting>
    implements MessageIInboxSettingRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'MessageInboxSetting';
    public collectionSource: MessageInboxSetting[];

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

        for (const itemCollection of <any[]>messageMockInboxSettingData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                MessageInboxSetting.register(
                    new MessageInboxSettingId(itemCollection.id),
                    new MessageInboxSettingRowId(itemCollection.rowId),
                    new MessageInboxSettingAccountId(itemCollection.accountId),
                    new MessageInboxSettingLastReadMessageRowId(
                        itemCollection.lastReadMessageRowId,
                    ),
                    new MessageInboxSettingCreatedAt(itemCollection.createdAt),
                    new MessageInboxSettingUpdatedAt(itemCollection.updatedAt),
                    new MessageInboxSettingDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
