import { WhatsappCreateConversationInput } from '@api/graphql';
import { WhatsappCreateConversationDto } from '@api/whatsapp/conversation';
import { WhatsappCreateConversationsCommand } from '@app/whatsapp/conversation';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappCreateConversationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: WhatsappCreateConversationInput[] | WhatsappCreateConversationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new WhatsappCreateConversationsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
