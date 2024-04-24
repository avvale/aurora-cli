import { WhatsappTimeline, WhatsappUpdateTimelineByIdInput } from '@api/graphql';
import { WhatsappTimelineDto, WhatsappUpdateTimelineByIdDto } from '@api/whatsapp/timeline';
import { WhatsappFindTimelineByIdQuery, WhatsappUpdateTimelineByIdCommand } from '@app/whatsapp/timeline';
import { diff, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappUpdateTimelineByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappUpdateTimelineByIdInput | WhatsappUpdateTimelineByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappTimeline | WhatsappTimelineDto>
    {
        const timeline = await this.queryBus.ask(new WhatsappFindTimelineByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, timeline);

        await this.commandBus.dispatch(new WhatsappUpdateTimelineByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappFindTimelineByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
