import { OAuthAddApplicationsClientsContextEvent, OAuthApplicationClient, OAuthIApplicationClientRepository } from '@app/o-auth/application-client';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpdateApplicationsClientsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIApplicationClientRepository,
    ) {}

    async main(
        payload: {
            applicationId?: OAuthApplicationClientApplicationId;
            clientId?: OAuthApplicationClientClientId;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationClient = OAuthApplicationClient.register(
            payload.applicationId,
            payload.clientId,
        );

        // update
        await this.repository.update(
            applicationClient,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applicationsClients = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationsClientsRegister = this.publisher.mergeObjectContext(
            new OAuthAddApplicationsClientsContextEvent(applicationsClients),
        );

        applicationsClientsRegister.updated(); // apply event to model events
        applicationsClientsRegister.commit(); // commit all events of model
    }
}
