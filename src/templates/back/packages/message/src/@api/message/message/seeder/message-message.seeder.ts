import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { MessageCreateMessagesCommand } from '@app/message/message';
import { messageMockMessageData } from '@app/message/message';

@Injectable()
export class MessageMessageSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new MessageCreateMessagesCommand(
            messageMockMessageData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
