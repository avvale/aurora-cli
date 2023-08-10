import { OAuthIApplicationRepository } from '@app/o-auth/application';
import { OAuthApplicationId } from '@app/o-auth/application/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteApplicationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIApplicationRepository,
    ) {}

    async main(
        id: OAuthApplicationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const application = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                application.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(application);

        applicationRegister.deleted(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}
