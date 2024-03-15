import { WhatsappMessage } from '@api/graphql';
import { WhatsappMessageDto } from '@api/whatsapp/message';
import { WhatsappFindMessageQuery } from '@app/whatsapp/message';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindMessageHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappMessage | WhatsappMessageDto>
    {
        return await this.queryBus.ask(new WhatsappFindMessageQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
