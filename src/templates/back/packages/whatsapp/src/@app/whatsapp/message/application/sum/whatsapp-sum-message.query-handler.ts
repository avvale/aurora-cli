import { WhatsappSumMessageQuery } from '@app/whatsapp/message';
import { WhatsappSumMessageService } from '@app/whatsapp/message/application/sum/whatsapp-sum-message.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappSumMessageQuery)
export class WhatsappSumMessageQueryHandler implements IQueryHandler<WhatsappSumMessageQuery>
{
    constructor(
        private readonly sumMessageService: WhatsappSumMessageService,
    ) {}

    async execute(query: WhatsappSumMessageQuery): Promise<number>
    {
        return await this.sumMessageService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
