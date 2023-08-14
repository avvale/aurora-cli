import { OAuthApplication, OAuthIApplicationRepository } from '@app/o-auth/application';
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
export class OAuthCreateApplicationService
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const application = OAuthApplication.register(
            payload.id,
            payload.code,
            payload.name,
            payload.secret,
            payload.isMaster,
            payload.clientIds,
            new OAuthApplicationCreatedAt({ currentTimestamp: true }),
            new OAuthApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            application,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(
            application,
        );

        applicationRegister.created(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}
