import { MessageSumInboxSettingQuery } from '@app/message/inbox-setting';
import { MessageSumInboxSettingService } from '@app/message/inbox-setting/application/sum/message-sum-inbox-setting.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageSumInboxSettingQuery)
export class MessageSumInboxSettingQueryHandler implements IQueryHandler<MessageSumInboxSettingQuery>
{
    constructor(
        private readonly sumInboxSettingService: MessageSumInboxSettingService,
    ) {}

    async execute(query: MessageSumInboxSettingQuery): Promise<number>
    {
        return await this.sumInboxSettingService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
