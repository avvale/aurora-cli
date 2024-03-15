import { WhatsappMinMessageQuery } from '@app/whatsapp/message';
import { WhatsappMinMessageService } from '@app/whatsapp/message/application/min/whatsapp-min-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappMinMessageQuery)
export class WhatsappMinMessageQueryHandler implements IQueryHandler<WhatsappMinMessageQuery>
{
    constructor(
        private readonly minMessageService: WhatsappMinMessageService,
    ) {}

    async execute(query: WhatsappMinMessageQuery): Promise<number>
    {
        return await this.minMessageService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
