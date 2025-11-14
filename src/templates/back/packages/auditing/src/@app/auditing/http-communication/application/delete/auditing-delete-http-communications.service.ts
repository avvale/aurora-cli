import {
    AuditingAddHttpCommunicationsContextEvent,
    AuditingIHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AuditingDeleteHttpCommunicationsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AuditingIHttpCommunicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get objects to delete
        const httpCommunications = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (httpCommunications.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddHttpCommunicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const httpCommunicationsRegistered = this.publisher.mergeObjectContext(
            new AuditingAddHttpCommunicationsContextEvent(
                httpCommunications,
                cQMetadata,
            ),
        );

        httpCommunicationsRegistered.deleted(); // apply event to model events
        httpCommunicationsRegistered.commit(); // commit all events of model
    }
}
