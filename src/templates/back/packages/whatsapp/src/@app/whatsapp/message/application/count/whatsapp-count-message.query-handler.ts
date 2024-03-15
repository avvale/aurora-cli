import { WhatsappCountMessageQuery } from '@app/whatsapp/message';
import { WhatsappCountMessageService } from '@app/whatsapp/message/application/count/whatsapp-count-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappCountMessageQuery)
export class WhatsappCountMessageQueryHandler implements IQueryHandler<WhatsappCountMessageQuery>
{
    constructor(
        private readonly countMessageService: WhatsappCountMessageService,
    ) {}

    async execute(query: WhatsappCountMessageQuery): Promise<number>
    {
        return await this.countMessageService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
