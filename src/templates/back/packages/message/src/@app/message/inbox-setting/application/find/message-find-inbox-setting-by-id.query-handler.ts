import { MessageFindInboxSettingByIdQuery, MessageInboxSettingMapper, MessageInboxSettingResponse } from '@app/message/inbox-setting';
import { MessageFindInboxSettingByIdService } from '@app/message/inbox-setting/application/find/message-find-inbox-setting-by-id.service';
import { MessageInboxSettingId } from '@app/message/inbox-setting/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageFindInboxSettingByIdQuery)
export class MessageFindInboxSettingByIdQueryHandler implements IQueryHandler<MessageFindInboxSettingByIdQuery>
{
    private readonly mapper: MessageInboxSettingMapper = new MessageInboxSettingMapper();

    constructor(
        private readonly findInboxSettingByIdService: MessageFindInboxSettingByIdService,
    ) {}

    async execute(query: MessageFindInboxSettingByIdQuery): Promise<MessageInboxSettingResponse>
    {
        const inboxSetting = await this.findInboxSettingByIdService.main(
            new MessageInboxSettingId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(inboxSetting);
    }
}
