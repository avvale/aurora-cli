import { OAuthAddApplicationsClientsContextEvent, OAuthApplicationClient, OAuthIApplicationClientRepository } from '@app/o-auth/application-client';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthCreateApplicationsClientsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIApplicationClientRepository,
    ) {}

    async main(
        payload: {
            applicationId: OAuthApplicationClientApplicationId;
            clientId: OAuthApplicationClientClientId;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationsClients = payload.map(applicationClient => OAuthApplicationClient.register(
            applicationClient.applicationId,
            applicationClient.clientId,
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationsClients,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationsClientsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationsClientsRegistered = this.publisher.mergeObjectContext(new OAuthAddApplicationsClientsContextEvent(aggregateApplicationsClients));

        applicationsClientsRegistered.created(); // apply event to model events
        applicationsClientsRegistered.commit(); // commit all events of model
    }
}
