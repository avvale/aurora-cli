import { MessageMaxInboxSettingQuery } from '@app/message/inbox-setting';
import { MessageMaxInboxSettingService } from '@app/message/inbox-setting/application/max/message-max-inbox-setting.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageMaxInboxSettingQuery)
export class MessageMaxInboxSettingQueryHandler implements IQueryHandler<MessageMaxInboxSettingQuery>
{
    constructor(
        private readonly maxInboxSettingService: MessageMaxInboxSettingService,
    ) {}

    async execute(query: MessageMaxInboxSettingQuery): Promise<number>
    {
        return await this.maxInboxSettingService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
