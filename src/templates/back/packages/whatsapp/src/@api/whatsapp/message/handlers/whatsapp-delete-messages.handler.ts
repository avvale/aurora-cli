import { WhatsappMessage } from '@api/graphql';
import { WhatsappMessageDto } from '@api/whatsapp/message';
import { WhatsappDeleteMessagesCommand, WhatsappGetMessagesQuery } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappDeleteMessagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappMessage[] | WhatsappMessageDto[]>
    {
        const messages = await this.queryBus.ask(new WhatsappGetMessagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new WhatsappDeleteMessagesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return messages;
    }
}
