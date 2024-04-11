import { MessageCountInboxSettingQuery } from '@app/message/inbox-setting';
import { MessageCountInboxSettingService } from '@app/message/inbox-setting/application/count/message-count-inbox-setting.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageCountInboxSettingQuery)
export class MessageCountInboxSettingQueryHandler implements IQueryHandler<MessageCountInboxSettingQuery>
{
    constructor(
        private readonly countInboxSettingService: MessageCountInboxSettingService,
    ) {}

    async execute(query: MessageCountInboxSettingQuery): Promise<number>
    {
        return await this.countInboxSettingService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
