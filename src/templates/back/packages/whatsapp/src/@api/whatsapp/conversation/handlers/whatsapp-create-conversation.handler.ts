import { WhatsappConversation, WhatsappCreateConversationInput } from '@api/graphql';
import { WhatsappConversationDto, WhatsappCreateConversationDto } from '@api/whatsapp/conversation';
import { WhatsappCreateConversationCommand, WhatsappFindConversationByIdQuery } from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappCreateConversationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappCreateConversationInput | WhatsappCreateConversationDto,
        timezone?: string,
    ): Promise<WhatsappConversation | WhatsappConversationDto>
    {
        await this.commandBus.dispatch(new WhatsappCreateConversationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappFindConversationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
