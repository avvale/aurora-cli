import { WhatsappFindMessageQuery, WhatsappMessageMapper, WhatsappMessageResponse } from '@app/whatsapp/message';
import { WhatsappFindMessageService } from '@app/whatsapp/message/application/find/whatsapp-find-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappFindMessageQuery)
export class WhatsappFindMessageQueryHandler implements IQueryHandler<WhatsappFindMessageQuery>
{
    private readonly mapper: WhatsappMessageMapper = new WhatsappMessageMapper();

    constructor(
        private readonly findMessageService: WhatsappFindMessageService,
    ) {}

    async execute(query: WhatsappFindMessageQuery): Promise<WhatsappMessageResponse>
    {
        const message = await this.findMessageService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(message);
    }
}
