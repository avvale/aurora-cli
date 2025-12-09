import {
    MessageGetMessagesQuery,
    MessageMessage,
    MessageMessageMapper,
    MessageMessageResponse,
} from '@app/message/message';
import { MessageGetMessagesService } from '@app/message/message/application/get/message-get-messages.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessageGetMessagesQuery)
export class MessageGetMessagesQueryHandler
    implements IQueryHandler<MessageGetMessagesQuery>
{
    private readonly mapper: MessageMessageMapper = new MessageMessageMapper();

    constructor(
        private readonly getMessagesService: MessageGetMessagesService,
    ) {}

    async execute(
        query: MessageGetMessagesQuery,
    ): Promise<MessageMessageResponse[] | LiteralObject[]> {
        const models = await this.getMessagesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(models as MessageMessage[]);
    }
}
