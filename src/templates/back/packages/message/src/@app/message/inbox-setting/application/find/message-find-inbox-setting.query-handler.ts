import { MessageFindInboxSettingQuery, MessageInboxSettingMapper, MessageInboxSettingResponse } from '@app/message/inbox-setting';
import { MessageFindInboxSettingService } from '@app/message/inbox-setting/application/find/message-find-inbox-setting.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageFindInboxSettingQuery)
export class MessageFindInboxSettingQueryHandler implements IQueryHandler<MessageFindInboxSettingQuery>
{
    private readonly mapper: MessageInboxSettingMapper = new MessageInboxSettingMapper();

    constructor(
        private readonly findInboxSettingService: MessageFindInboxSettingService,
    ) {}

    async execute(query: MessageFindInboxSettingQuery): Promise<MessageInboxSettingResponse>
    {
        const inboxSetting = await this.findInboxSettingService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(inboxSetting);
    }
}
