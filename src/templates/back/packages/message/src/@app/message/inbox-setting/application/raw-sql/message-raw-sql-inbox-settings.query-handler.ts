import { MessageInboxSettingMapper, MessageInboxSettingResponse, MessageRawSQLInboxSettingsQuery } from '@app/message/inbox-setting';
import { MessageRawSQLInboxSettingsService } from '@app/message/inbox-setting/application/raw-sql/message-raw-sql-inbox-settings.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageRawSQLInboxSettingsQuery)
export class MessageRawSQLInboxSettingsQueryHandler implements IQueryHandler<MessageRawSQLInboxSettingsQuery>
{
    private readonly mapper: MessageInboxSettingMapper = new MessageInboxSettingMapper();

    constructor(
        private readonly rawSQLInboxSettingsService: MessageRawSQLInboxSettingsService,
    ) {}

    async execute(query: MessageRawSQLInboxSettingsQuery): Promise<MessageInboxSettingResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLInboxSettingsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
