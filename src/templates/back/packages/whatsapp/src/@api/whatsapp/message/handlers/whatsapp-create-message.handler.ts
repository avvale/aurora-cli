import { WhatsappCreateMessageInput, WhatsappMessage } from '@api/graphql';
import { WhatsappCreateMessageDto, WhatsappMessageDto } from '@api/whatsapp/message';
import { WhatsappCreateMessageCommand, WhatsappFindMessageByIdQuery } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappCreateMessageHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappCreateMessageInput | WhatsappCreateMessageDto,
        timezone?: string,
    ): Promise<WhatsappMessage | WhatsappMessageDto>
    {
        await this.commandBus.dispatch(new WhatsappCreateMessageCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappFindMessageByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
