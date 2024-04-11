import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { MessageCreateOutboxesCommand } from '@app/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';

@Injectable()
export class MessageOutboxSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new MessageCreateOutboxesCommand(
            messageMockOutboxData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
