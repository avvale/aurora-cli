import { MessageInboxSetting, MessageInboxSettingResponse } from '@app/message/inbox-setting';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingCreatedAt,
    MessageInboxSettingDeletedAt,
    MessageInboxSettingId,
    MessageInboxSettingSort,
    MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class MessageInboxSettingMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param inboxSetting
     */
    mapModelToAggregate(inboxSetting: LiteralObject, cQMetadata?: CQMetadata): MessageInboxSetting
    {
        if (!inboxSetting) return;

        return this.makeAggregate(inboxSetting, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param inboxSettings
     */
    mapModelsToAggregates(inboxSettings: LiteralObject[], cQMetadata?: CQMetadata): MessageInboxSetting[]
    {
        if (!Array.isArray(inboxSettings)) return;

        return inboxSettings.map(inboxSetting => this.makeAggregate(inboxSetting, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param inboxSetting
     */
    mapAggregateToResponse(inboxSetting: MessageInboxSetting): MessageInboxSettingResponse
    {
        return this.makeResponse(inboxSetting);
    }

    /**
     * Map array of aggregates to array responses
     * @param inboxSettings
     */
    mapAggregatesToResponses(inboxSettings: MessageInboxSetting[]): MessageInboxSettingResponse[]
    {
        if (!Array.isArray(inboxSettings)) return;

        return inboxSettings.map(inboxSetting => this.makeResponse(inboxSetting));
    }

    private makeAggregate(inboxSetting: LiteralObject, cQMetadata?: CQMetadata): MessageInboxSetting
    {
        return MessageInboxSetting.register(
            new MessageInboxSettingId(inboxSetting.id, { undefinable: true }),
            new MessageInboxSettingAccountId(inboxSetting.accountId, { undefinable: true }),
            new MessageInboxSettingSort(inboxSetting.sort, { undefinable: true }),
            new MessageInboxSettingCreatedAt(inboxSetting.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new MessageInboxSettingUpdatedAt(inboxSetting.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new MessageInboxSettingDeletedAt(inboxSetting.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(inboxSetting: MessageInboxSetting): MessageInboxSettingResponse
    {
        if (!inboxSetting) return;

        return new MessageInboxSettingResponse(
            inboxSetting.id.value,
            inboxSetting.accountId.value,
            inboxSetting.sort.value,
            inboxSetting.createdAt.value,
            inboxSetting.updatedAt.value,
            inboxSetting.deletedAt.value,
        );
    }
}
