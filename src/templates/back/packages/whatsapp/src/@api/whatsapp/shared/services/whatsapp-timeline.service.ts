import { ICommandBus, IQueryBus, uuid } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { WhatsappTimeline } from '@api/graphql';
import { WhatsappCreateTimelineCommand, WhatsappFindTimelineByIdQuery, WhatsappFindTimelineQuery } from '@app/whatsapp/timeline';

@Injectable()
export class WhatsappTimelineService
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async getTimeline(
        wabaPhoneNumberId: string,
        wabaContactId: string,
    ): Promise<WhatsappTimeline>
    {
        try
        {
            return await this.queryBus.ask(new WhatsappFindTimelineQuery(
                {
                    where: {
                        wabaPhoneNumberId,
                        wabaContactId,
                    },
                },
            ));
        }
        catch (error)
        {
            if (error.response.statusCode === 404)
            {
                const timelineId = uuid();
                await this.commandBus.dispatch(new WhatsappCreateTimelineCommand(
                    {
                        id      : timelineId,
                        accounts: [],
                        wabaPhoneNumberId,
                        wabaContactId,
                    },
                ));

                return await this.queryBus.ask(new WhatsappFindTimelineByIdQuery(
                    timelineId,
                ));
            }
            else
            {
                throw error;
            }
        }
    }
}