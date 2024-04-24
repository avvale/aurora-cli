import { WhatsappITimelineRepository, WhatsappTimeline } from '@app/whatsapp/timeline';
import {
    WhatsappTimelineAccounts,
    WhatsappTimelineCreatedAt,
    WhatsappTimelineDeletedAt,
    WhatsappTimelineId,
    WhatsappTimelineUpdatedAt,
    WhatsappTimelineWabaContactId,
    WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappUpdateTimelineByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappITimelineRepository,
    ) {}

    async main(
        payload: {
            id: WhatsappTimelineId;
            accounts?: WhatsappTimelineAccounts;
            wabaPhoneNumberId?: WhatsappTimelineWabaPhoneNumberId;
            wabaContactId?: WhatsappTimelineWabaContactId;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const timeline = WhatsappTimeline.register(
            payload.id,
            payload.accounts,
            payload.wabaPhoneNumberId,
            payload.wabaContactId,
            null, // createdAt
            new WhatsappTimelineUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            timeline,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const timelineRegister = this.publisher.mergeObjectContext(
            timeline,
        );

        timelineRegister.updated(timeline); // apply event to model events
        timelineRegister.commit(); // commit all events of model
    }
}
