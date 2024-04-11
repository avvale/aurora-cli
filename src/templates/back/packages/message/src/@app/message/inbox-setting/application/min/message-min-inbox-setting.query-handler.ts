import { MessageMinInboxSettingQuery } from '@app/message/inbox-setting';
import { MessageMinInboxSettingService } from '@app/message/inbox-setting/application/min/message-min-inbox-setting.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageMinInboxSettingQuery)
export class MessageMinInboxSettingQueryHandler implements IQueryHandler<MessageMinInboxSettingQuery>
{
    constructor(
        private readonly minInboxSettingService: MessageMinInboxSettingService,
    ) {}

    async execute(query: MessageMinInboxSettingQuery): Promise<number>
    {
        return await this.minInboxSettingService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
