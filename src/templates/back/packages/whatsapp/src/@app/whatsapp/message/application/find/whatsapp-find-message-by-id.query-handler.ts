import { WhatsappFindMessageByIdQuery, WhatsappMessageMapper, WhatsappMessageResponse } from '@app/whatsapp/message';
import { WhatsappFindMessageByIdService } from '@app/whatsapp/message/application/find/whatsapp-find-message-by-id.service';
import { WhatsappMessageId } from '@app/whatsapp/message/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappFindMessageByIdQuery)
export class WhatsappFindMessageByIdQueryHandler implements IQueryHandler<WhatsappFindMessageByIdQuery>
{
    private readonly mapper: WhatsappMessageMapper = new WhatsappMessageMapper();

    constructor(
        private readonly findMessageByIdService: WhatsappFindMessageByIdService,
    ) {}

    async execute(query: WhatsappFindMessageByIdQuery): Promise<WhatsappMessageResponse>
    {
        const message = await this.findMessageByIdService.main(
            new WhatsappMessageId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(message);
    }
}
