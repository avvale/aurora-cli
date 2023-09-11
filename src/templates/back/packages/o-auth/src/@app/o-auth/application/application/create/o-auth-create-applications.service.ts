import { OAuthAddApplicationsContextEvent, OAuthApplication, OAuthIApplicationRepository } from '@app/o-auth/application';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationCreatedAt,
    OAuthApplicationDeletedAt,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationUpdatedAt,
} from '@app/o-auth/application/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthCreateApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIApplicationRepository,
    ) {}

    async main(
        payload: {
            id: OAuthApplicationId;
            code: OAuthApplicationCode;
            name: OAuthApplicationName;
            secret: OAuthApplicationSecret;
            isMaster: OAuthApplicationIsMaster;
            clientIds: OAuthApplicationClientIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplications = payload.map(application => OAuthApplication.register(
            application.id,
            application.code,
            application.name,
            application.secret,
            application.isMaster,
            application.clientIds,
            new OAuthApplicationCreatedAt({ currentTimestamp: true }),
            new OAuthApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplications,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationsRegistered = this.publisher.mergeObjectContext(new OAuthAddApplicationsContextEvent(aggregateApplications));

        applicationsRegistered.created(); // apply event to model events
        applicationsRegistered.commit(); // commit all events of model
    }
}
