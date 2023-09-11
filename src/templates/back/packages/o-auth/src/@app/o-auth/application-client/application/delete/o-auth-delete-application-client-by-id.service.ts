import { OAuthIApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthApplicationClientApplicationId, OAuthApplicationClientClientId } from '@app/o-auth/application-client/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteApplicationClientByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIApplicationClientRepository,
    ) {}

    async main(
        applicationId: OAuthApplicationClientApplicationId,
        clientId: OAuthApplicationClientClientId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationClient = await this.repository
            .findById(
                undefined,
                {
                    constraint,
                    cQMetadata,
                    findArguments: {
                        applicationId: applicationId.value,
                        clientId: clientId.value,
                    },
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                undefined,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                    findArguments: {
                        applicationId: applicationClient.applicationId.value,
                        clientId: applicationClient.clientId.value,
                    },
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationClientRegister = this.publisher.mergeObjectContext(applicationClient);

        applicationClientRegister.deleted(applicationClient); // apply event to model events
        applicationClientRegister.commit(); // commit all events of model
    }
}
