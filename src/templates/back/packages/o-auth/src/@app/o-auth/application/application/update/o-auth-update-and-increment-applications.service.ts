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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpdateAndIncrementApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIApplicationRepository,
    ) {}

    async main(
        payload: {
            id?: OAuthApplicationId;
            code?: OAuthApplicationCode;
            name?: OAuthApplicationName;
            secret?: OAuthApplicationSecret;
            isMaster?: OAuthApplicationIsMaster;
            clientIds?: OAuthApplicationClientIds;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
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
            null, // createdAt
            new OAuthApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            application,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applications = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationsRegister = this.publisher.mergeObjectContext(
            new OAuthAddApplicationsContextEvent(applications),
        );

        applicationsRegister.updatedAndIncremented(); // apply event to model events
        applicationsRegister.commit(); // commit all events of model
    }
}
