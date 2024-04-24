import { WhatsappTimeline, WhatsappUpdateTimelinesInput } from '@api/graphql';
import { WhatsappTimelineDto, WhatsappUpdateTimelinesDto } from '@api/whatsapp/timeline';
import { WhatsappGetTimelinesQuery, WhatsappUpdateTimelinesCommand } from '@app/whatsapp/timeline';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappUpdateTimelinesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappUpdateTimelinesInput | WhatsappUpdateTimelinesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappTimeline | WhatsappTimelineDto>
    {
        await this.commandBus.dispatch(new WhatsappUpdateTimelinesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappGetTimelinesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
