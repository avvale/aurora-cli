import { WhatsappMessage, WhatsappUpdateMessagesInput } from '@api/graphql';
import { WhatsappMessageDto, WhatsappUpdateMessagesDto } from '@api/whatsapp/message';
import { WhatsappGetMessagesQuery, WhatsappUpdateMessagesCommand } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappUpdateMessagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappUpdateMessagesInput | WhatsappUpdateMessagesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappMessage | WhatsappMessageDto>
    {
        await this.commandBus.dispatch(new WhatsappUpdateMessagesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappGetMessagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
