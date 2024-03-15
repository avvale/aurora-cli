import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { WhatsappCreateConversationsCommand } from '@app/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';

@Injectable()
export class WhatsappConversationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new WhatsappCreateConversationsCommand(
            whatsappMockConversationData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
