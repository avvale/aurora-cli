import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
    MessageCreateOutboxesCommand,
    messageMockOutboxData,
} from '@app/message/outbox';

@Injectable()
export class MessageOutboxSeeder {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        await this.commandBus.dispatch(
            new MessageCreateOutboxesCommand(messageMockOutboxData, {
                timezone: process.env.TZ,
            }),
        );

        return true;
    }
}
