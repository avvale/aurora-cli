import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { WhatsappCreateTimelinesCommand } from '@app/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';

@Injectable()
export class WhatsappTimelineSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new WhatsappCreateTimelinesCommand(
            whatsappMockTimelineData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
