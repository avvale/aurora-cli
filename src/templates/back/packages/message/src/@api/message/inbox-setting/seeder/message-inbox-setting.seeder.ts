import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { MessageCreateInboxSettingsCommand } from '@app/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';

@Injectable()
export class MessageInboxSettingSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new MessageCreateInboxSettingsCommand(
            messageMockInboxSettingData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
