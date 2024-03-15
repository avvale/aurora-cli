import { WhatsappCreateMessageInput } from '@api/graphql';
import { WhatsappCreateMessageDto } from '@api/whatsapp/message';
import { WhatsappCreateMessagesCommand } from '@app/whatsapp/message';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappCreateMessagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: WhatsappCreateMessageInput[] | WhatsappCreateMessageDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new WhatsappCreateMessagesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
