import { WhatsappConversation } from '@api/graphql';
import { WhatsappConversationDto } from '@api/whatsapp/conversation';
import { WhatsappDeleteConversationByIdCommand, WhatsappFindConversationByIdQuery } from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappDeleteConversationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappConversation | WhatsappConversationDto>
    {
        const conversation = await this.queryBus.ask(new WhatsappFindConversationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new WhatsappDeleteConversationByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return conversation;
    }
}
