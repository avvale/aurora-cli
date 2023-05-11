import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { HttpCommunicationId } from '../../domain/value-objects';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';

@Injectable()
export class DeleteHttpCommunicationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IHttpCommunicationRepository,
    ) {}

    async main(
        id: HttpCommunicationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const httpCommunication = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            httpCommunication.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const httpCommunicationRegister = this.publisher.mergeObjectContext(httpCommunication);

        httpCommunicationRegister.deleted(httpCommunication); // apply event to model events
        httpCommunicationRegister.commit(); // commit all events of model
    }
}