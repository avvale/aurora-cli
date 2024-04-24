import { WhatsappTimeline } from '@api/graphql';
import { WhatsappTimelineDto } from '@api/whatsapp/timeline';
import { WhatsappGetTimelinesQuery } from '@app/whatsapp/timeline';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappGetTimelinesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappTimeline[] | WhatsappTimelineDto[]>
    {
        return await this.queryBus.ask(new WhatsappGetTimelinesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
