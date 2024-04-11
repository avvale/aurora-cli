import { MessageGetInboxSettingsQuery, MessageInboxSettingMapper, MessageInboxSettingResponse } from '@app/message/inbox-setting';
import { MessageGetInboxSettingsService } from '@app/message/inbox-setting/application/get/message-get-inbox-settings.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageGetInboxSettingsQuery)
export class MessageGetInboxSettingsQueryHandler implements IQueryHandler<MessageGetInboxSettingsQuery>
{
    private readonly mapper: MessageInboxSettingMapper = new MessageInboxSettingMapper();

    constructor(
        private readonly getInboxSettingsService: MessageGetInboxSettingsService,
    ) {}

    async execute(query: MessageGetInboxSettingsQuery): Promise<MessageInboxSettingResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getInboxSettingsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
