import { WhatsappTimeline } from '@api/graphql';
import { WhatsappTimelineDto } from '@api/whatsapp/timeline';
import { WhatsappDeleteTimelinesCommand, WhatsappGetTimelinesQuery } from '@app/whatsapp/timeline';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappDeleteTimelinesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappTimeline[] | WhatsappTimelineDto[]>
    {
        const timelines = await this.queryBus.ask(new WhatsappGetTimelinesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new WhatsappDeleteTimelinesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return timelines;
    }
}
