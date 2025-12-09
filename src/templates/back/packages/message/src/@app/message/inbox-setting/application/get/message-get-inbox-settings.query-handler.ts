import {
    MessageGetInboxSettingsQuery,
    MessageInboxSetting,
    MessageInboxSettingMapper,
    MessageInboxSettingResponse,
} from '@app/message/inbox-setting';
import { MessageGetInboxSettingsService } from '@app/message/inbox-setting/application/get/message-get-inbox-settings.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageGetInboxSettingsQuery)
export class MessageGetInboxSettingsQueryHandler
    implements IQueryHandler<MessageGetInboxSettingsQuery>
{
    private readonly mapper: MessageInboxSettingMapper =
        new MessageInboxSettingMapper();

    constructor(
        private readonly getInboxSettingsService: MessageGetInboxSettingsService,
    ) {}

    async execute(
        query: MessageGetInboxSettingsQuery,
    ): Promise<MessageInboxSettingResponse[] | LiteralObject[]> {
        const models = await this.getInboxSettingsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(
            models as MessageInboxSetting[],
        );
    }
}
