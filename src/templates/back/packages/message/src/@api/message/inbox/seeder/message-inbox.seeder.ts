import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { MessageCreateInboxesCommand } from '@app/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';

@Injectable()
export class MessageInboxSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new MessageCreateInboxesCommand(
            messageMockInboxData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
