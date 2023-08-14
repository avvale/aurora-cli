import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    OAuthApplicationId,
    OAuthApplicationCode,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationIsMaster,
    OAuthApplicationClientIds,
    OAuthApplicationCreatedAt,
    OAuthApplicationUpdatedAt,
    OAuthApplicationDeletedAt,
} from '../../domain/value-objects';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthApplication } from '../../domain/o-auth-application.aggregate';
import { OAuthAddApplicationsContextEvent } from '../events/o-auth-add-applications-context.event';

@Injectable()
export class OAuthUpdateApplicationsService
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


        // update
        await this.repository.update(
            application,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
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

        applicationsRegister.updated(); // apply event to model events
        applicationsRegister.commit(); // commit all events of model
    }
}
