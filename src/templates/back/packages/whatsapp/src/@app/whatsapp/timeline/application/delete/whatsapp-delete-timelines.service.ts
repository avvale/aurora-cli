import { WhatsappAddTimelinesContextEvent, WhatsappITimelineRepository } from '@app/whatsapp/timeline';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappDeleteTimelinesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappITimelineRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const timelines = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (timelines.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddTimelinesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const timelinesRegistered = this.publisher.mergeObjectContext(
            new WhatsappAddTimelinesContextEvent(timelines),
        );

        timelinesRegistered.deleted(); // apply event to model events
        timelinesRegistered.commit(); // commit all events of model
    }
}
